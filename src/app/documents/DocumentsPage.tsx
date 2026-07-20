'use client';

import { useEffect, useState, useCallback } from 'react';
import { PageHead, SectionLabel } from '@/components/portal/ui';
import { FUND } from '@/constants/fund';
import {
  IconFolder,
  IconFile,
  IconFileSpreadsheet,
  IconFileText,
  IconPresentation,
  IconPhoto,
  IconFileZip,
  IconPdf,
  IconArrowLeft,
  IconExternalLink,
  IconRefresh,
} from '@tabler/icons-react';

/* ------------------------------------------------------------------ */
/*  Drive types & helpers                                              */
/* ------------------------------------------------------------------ */

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime: string;
  webViewLink?: string;
  isFolder: boolean;
}

interface Breadcrumb {
  id: string;
  name: string;
}

function getFileIcon(mimeType: string) {
  if (mimeType.includes('folder')) return IconFolder;
  if (mimeType.includes('pdf')) return IconPdf;
  if (mimeType.includes('spreadsheet') || mimeType.includes('excel') || mimeType.includes('csv'))
    return IconFileSpreadsheet;
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint'))
    return IconPresentation;
  if (mimeType.includes('image')) return IconPhoto;
  if (mimeType.includes('zip') || mimeType.includes('compressed') || mimeType.includes('archive'))
    return IconFileZip;
  if (mimeType.includes('document') || mimeType.includes('word') || mimeType.includes('text'))
    return IconFileText;
  return IconFile;
}

function formatBytes(bytes: string | undefined) {
  if (!bytes) return '—';
  const n = parseInt(bytes, 10);
  if (isNaN(n)) return '—';
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/* ------------------------------------------------------------------ */
/*  Legal content                                                      */
/* ------------------------------------------------------------------ */

const legalSections = [
  {
    title: 'Fund entity & structure',
    items: [
      `${FUND.legalName} — a ${FUND.domicile} limited partnership`,
      `General Partner & Management Company: ${FUND.gpEntity}`,
      `Asset class: ${FUND.assetClass} (the ${FUND.instrument})`,
      `Target size ${FUND.targetSize} · Hard cap ${FUND.hardCap}`,
      `Management fee ${FUND.managementFee} · Carried interest ${FUND.carry}`,
      `Minimum LP commitment: ${FUND.minCommitment}`,
    ],
    note: null,
  },
  {
    title: 'Fund documents',
    items: [
      'Limited Partnership Agreement (LPA)',
      'Private Placement Memorandum (PPM)',
      'Subscription Agreement',
      'Certificate of Limited Partnership — Edin Capital Fund I LP',
      'Certificate of Formation — Edin Capital Fund I GP LLC',
      'Certificate of Formation — Edin Capital LLC (Management Co.)',
      'Operating Agreement — Edin Capital Fund I GP LLC',
      'Operating Agreement — Edin Capital LLC',
    ],
    note: 'Final versions are provided to committed investors during the subscription process. Contact your Edin representative for access.',
  },
  {
    title: 'Compliance',
    items: [
      'Anti-Money Laundering (AML) policy',
      'Know Your Customer (KYC) procedures',
      'Accredited-investor verification',
      'Data privacy & security policy',
      'Conflicts-of-interest policy',
    ],
    note: 'Edin Capital maintains compliance policies aligned with SEC regulations for exempt fund offerings. The compliance manual is available on request.',
  },
  {
    title: 'Service providers',
    items: [
      `Auditor: ${FUND.auditor} (audited annual financials within 120 days of year end)`,
      `Banking: ${FUND.banks.join('; ')}`,
      `Legal counsel: ${FUND.legalCounsel}`,
    ],
    note: null,
  },
  {
    title: 'Regulatory disclosures',
    items: [
      `Operates under Regulation D, Rule ${FUND.regDRule} exemption`,
      `Investment Company Act ${FUND.icaExemption} (≤100 beneficial owners; accredited investors only)`,
      `Adviser relies on the ${FUND.adviserExemption} exemption`,
      'Securities offered are not registered under the Securities Act of 1933',
      'Investment restricted to accredited investors as defined by the SEC',
      'Past performance is not indicative of future results',
      'All investments involve substantial risk, including loss of principal',
    ],
    note: null,
  },
];

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

type Tab = 'files' | 'legal';

export function DocumentsPage() {
  const [tab, setTab] = useState<Tab>('files');
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  const [rootFolderId, setRootFolderId] = useState<string>('');
  const [currentFolder, setCurrentFolder] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFolder = useCallback(async (folderId?: string) => {
    setLoading(true);
    setError(null);
    try {
      const params = folderId ? `?folderId=${folderId}` : '';
      const res = await fetch(`/api/documents${params}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to load documents');
      }
      const data = await res.json();
      setFiles(data.files);
      setBreadcrumbs(data.breadcrumbs);
      setRootFolderId(data.rootFolderId);
      setCurrentFolder(folderId || data.rootFolderId);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFolder();
  }, [fetchFolder]);

  const navigateToFolder = (folderId: string) => {
    fetchFolder(folderId);
  };

  const navigateUp = () => {
    if (breadcrumbs.length > 1) {
      fetchFolder(breadcrumbs[breadcrumbs.length - 2].id);
    } else {
      fetchFolder();
    }
  };

  const isInSubfolder = currentFolder && currentFolder !== rootFolderId;
  const folders = files.filter((f) => f.isFolder);
  const documents = files.filter((f) => !f.isFolder);

  return (
    <>
      <PageHead
        num="09"
        eyebrow="Documents & legal"
        title={<>Fund documents, files & <em>disclosures.</em></>}
        lede={`Shared documents, compliance framework, and regulatory disclosures for ${FUND.legalName}.`}
      />

      {/* Tabs */}
      <div className="ed-tabs">
        <button
          className={`ed-tab${tab === 'files' ? ' is-active' : ''}`}
          onClick={() => setTab('files')}
        >
          Shared Files
        </button>
        <button
          className={`ed-tab${tab === 'legal' ? ' is-active' : ''}`}
          onClick={() => setTab('legal')}
        >
          Legal & Compliance
        </button>
      </div>

      {/* ---- Shared Files tab ---- */}
      {tab === 'files' && (
        <>
          {/* Toolbar row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
            {isInSubfolder ? (
              <div className="doc-breadcrumbs" style={{ marginBottom: 0 }}>
                <button onClick={() => fetchFolder()} className="doc-crumb-link">
                  Documents
                </button>
                {breadcrumbs.map((bc, i) => (
                  <span key={bc.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                    <span className="doc-crumb-sep">/</span>
                    {i === breadcrumbs.length - 1 ? (
                      <span className="doc-crumb-current">{bc.name}</span>
                    ) : (
                      <button onClick={() => navigateToFolder(bc.id)} className="doc-crumb-link">
                        {bc.name}
                      </button>
                    )}
                  </span>
                ))}
              </div>
            ) : (
              <div />
            )}
            <button
              onClick={() => fetchFolder(isInSubfolder ? currentFolder : undefined)}
              className="doc-refresh-btn"
              title="Refresh"
            >
              <IconRefresh style={{ width: 16, height: 16 }} />
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="panel panel-pad" style={{ textAlign: 'center', padding: 'var(--space-9) var(--space-6)' }}>
              <div
                className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-3"
                style={{ borderColor: 'var(--green-700)' }}
              />
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                Loading documents…
              </p>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="panel panel-pad" style={{ textAlign: 'center', padding: 'var(--space-9) var(--space-6)' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>
                {error}
              </p>
              <button onClick={() => fetchFolder(isInSubfolder ? currentFolder : undefined)} className="doc-refresh-btn">
                Try again
              </button>
            </div>
          )}

          {/* Content */}
          {!loading && !error && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {isInSubfolder && (
                <button onClick={navigateUp} className="doc-back-btn">
                  <IconArrowLeft style={{ width: 16, height: 16 }} />
                  <span>Back</span>
                </button>
              )}

              {folders.length > 0 && (
                <div>
                  <div className="doc-section-label">Folders</div>
                  <div className="doc-folder-grid">
                    {folders.map((folder) => (
                      <button
                        key={folder.id}
                        onClick={() => navigateToFolder(folder.id)}
                        className="doc-folder-card"
                      >
                        <IconFolder className="doc-folder-icon" />
                        <span className="doc-folder-name">{folder.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {documents.length > 0 && (
                <div className="panel">
                  <div className="doc-section-label" style={{ padding: 'var(--space-4) var(--space-5) 0' }}>
                    Files
                  </div>
                  <div className="doc-file-list">
                    {documents.map((file) => {
                      const Icon = getFileIcon(file.mimeType);
                      return (
                        <a
                          key={file.id}
                          href={file.webViewLink || `https://drive.google.com/file/d/${file.id}/view`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="doc-file-row"
                        >
                          <Icon className="doc-file-icon" />
                          <span className="doc-file-name">{file.name}</span>
                          <span className="doc-file-meta">{formatBytes(file.size)}</span>
                          <span className="doc-file-meta">{formatDate(file.modifiedTime)}</span>
                          <IconExternalLink className="doc-file-open" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {folders.length === 0 && documents.length === 0 && (
                <div className="panel panel-pad" style={{ textAlign: 'center', padding: 'var(--space-9) var(--space-6)' }}>
                  <IconFolder style={{ width: 40, height: 40, color: 'var(--ink-300)', margin: '0 auto var(--space-3)' }} />
                  <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                    This folder is empty.
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* ---- Legal & Compliance tab ---- */}
      {tab === 'legal' && (
        <div className="ed-grid" style={{ gap: 'var(--space-4)' }}>
          {legalSections.map((sec) => (
            <div className="panel panel-pad" key={sec.title}>
              <div style={{
                fontFamily: 'var(--font-serif)', fontSize: 'var(--text-lg)',
                color: 'var(--text-strong)', marginBottom: 'var(--space-4)',
                paddingBottom: 'var(--space-3)',
                borderBottom: '1px solid var(--border-subtle)',
              }}>
                {sec.title}
              </div>

              <ul style={{
                display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
                listStyle: 'none', padding: 0, margin: 0,
                marginBottom: sec.note ? 'var(--space-4)' : 0,
              }}>
                {sec.items.map((it) => (
                  <li key={it} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)',
                    fontSize: 'var(--text-sm)', color: 'var(--text-secondary)',
                  }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: 'var(--gold-500)', marginTop: 7, flex: 'none',
                    }} />
                    {it}
                  </li>
                ))}
              </ul>

              {sec.note && (
                <p style={{
                  fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                  fontSize: 'var(--text-sm)', color: 'var(--text-muted)',
                  lineHeight: 1.55, paddingTop: 'var(--space-3)',
                  borderTop: '1px solid var(--border-subtle)',
                }}>
                  {sec.note}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
