import { Metadata } from 'next';
import { DocumentsPage } from './DocumentsPage';

export const metadata: Metadata = {
  title: 'Documents & Legal | Investor Dashboard',
  description: 'Fund documents, shared files, compliance framework, and regulatory disclosures.',
};

export default function Page() {
  return <DocumentsPage />;
}
