import { getTenantBySlug } from '../../../lib/tenant';
import LoginForm from "./LoginForm"
import { notFound } from 'next/navigation';

export default async function LoginPage({ params }: { params: { slug: string } }) {
  const tenant = await getTenantBySlug(params.slug);
  if (!tenant) return notFound();
  return <LoginForm tenant={tenant} />;
}
