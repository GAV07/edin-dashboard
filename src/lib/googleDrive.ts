import { google } from 'googleapis';

function getDriveClient() {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_EMAIL is not defined');
  }
  if (!process.env.GOOGLE_PRIVATE_KEY) {
    throw new Error('GOOGLE_PRIVATE_KEY is not defined');
  }

  const privateKey = process.env.GOOGLE_PRIVATE_KEY
    .replace(/\\n/g, '\n')
    .replace(/"/g, '');

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  return google.drive({ version: 'v3', auth });
}

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime: string;
  webViewLink?: string;
  iconLink?: string;
  isFolder: boolean;
  parents?: string[];
}

const FOLDER_MIME = 'application/vnd.google-apps.folder';

export async function listFolder(folderId: string): Promise<DriveFile[]> {
  const drive = getDriveClient();

  const files: DriveFile[] = [];
  let pageToken: string | undefined;

  do {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'nextPageToken, files(id, name, mimeType, size, modifiedTime, webViewLink, iconLink, parents)',
      orderBy: 'folder, name',
      pageSize: 100,
      pageToken,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

    for (const f of res.data.files || []) {
      files.push({
        id: f.id!,
        name: f.name!,
        mimeType: f.mimeType!,
        size: f.size || undefined,
        modifiedTime: f.modifiedTime!,
        webViewLink: f.webViewLink || undefined,
        iconLink: f.iconLink || undefined,
        isFolder: f.mimeType === FOLDER_MIME,
        parents: f.parents || undefined,
      });
    }

    pageToken = res.data.nextPageToken || undefined;
  } while (pageToken);

  return files;
}

export async function getFolderName(folderId: string): Promise<string> {
  const drive = getDriveClient();
  const res = await drive.files.get({
    fileId: folderId,
    fields: 'name',
    supportsAllDrives: true,
  });
  return res.data.name || 'Documents';
}

/** Build breadcrumb trail from current folder up to the root data-room folder */
export async function getFolderBreadcrumbs(
  folderId: string,
  rootFolderId: string,
): Promise<Array<{ id: string; name: string }>> {
  const drive = getDriveClient();
  const crumbs: Array<{ id: string; name: string }> = [];
  let currentId = folderId;

  while (currentId && currentId !== rootFolderId) {
    const res = await drive.files.get({
      fileId: currentId,
      fields: 'id, name, parents',
      supportsAllDrives: true,
    });
    crumbs.unshift({ id: res.data.id!, name: res.data.name! });
    currentId = res.data.parents?.[0] || '';
  }

  return crumbs;
}
