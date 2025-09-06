import { appPrisma } from "@/lib/prisma"

export async function getTenantBySlug(slug: string) {
  return appPrisma.tenant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      logoUrl: true,
      theme: true,
    },
  });
}
