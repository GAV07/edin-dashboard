'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', padding: '2rem', background: 'var(--surface-app)',
    }}>
      <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--text-strong)', marginBottom: '0.5rem' }}>
        Something went wrong
      </h2>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Please try again or contact your Edin representative.
      </p>
      <button
        onClick={reset}
        style={{
          padding: '8px 20px', borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-default)', background: 'var(--surface-card)',
          fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)',
          cursor: 'pointer',
        }}
      >
        Try again
      </button>
    </div>
  );
}
