
import { appPrisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const hospitalId = formData.get('hospitalId') as string;
    const plan = formData.get('plan') as string;
    const primaryColor = formData.get('primaryColor') as string;
    const secondaryColor = formData.get('secondaryColor') as string;

    const file = formData.get('logo') as File;

    if (!file || typeof file === 'string') {
      return Response.json({ error: 'Logo file is missing or invalid' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = file.type || 'image/png';
    const dataUrl = `data:${mimeType};base64,${base64String}`;

    const tenant = await appPrisma.tenant.create({
      data: {
        name,
        slug,
        hospitalId,
        plan,
        logoUrl: dataUrl,
        theme: {
          primaryColor,
          secondaryColor,
        },
      },
    });

    return Response.json({ tenant }, { status: 201 });
  } catch (err) {
    console.error('[Create Tenant Error]', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
