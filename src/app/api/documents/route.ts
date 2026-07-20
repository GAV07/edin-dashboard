import { NextRequest, NextResponse } from 'next/server';
import { listFolder, getFolderBreadcrumbs } from '@/lib/googleDrive';

const ROOT_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID!;

export async function GET(req: NextRequest) {
  const folderId = req.nextUrl.searchParams.get('folderId') || ROOT_FOLDER_ID;

  if (!ROOT_FOLDER_ID) {
    return NextResponse.json(
      { error: 'GOOGLE_DRIVE_FOLDER_ID is not configured' },
      { status: 500 },
    );
  }

  try {
    const [files, breadcrumbs] = await Promise.all([
      listFolder(folderId),
      folderId !== ROOT_FOLDER_ID
        ? getFolderBreadcrumbs(folderId, ROOT_FOLDER_ID)
        : Promise.resolve([]),
    ]);

    return NextResponse.json({ files, breadcrumbs, rootFolderId: ROOT_FOLDER_ID });
  } catch (err: any) {
    console.error('Drive API error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to list documents' },
      { status: 500 },
    );
  }
}
