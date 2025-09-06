import { PrismaClient as AppClient } from '../../prisma/generated/index.js';

declare global {
    var appPrisma: AppClient | undefined;
}

const appPrisma = global.appPrisma ?? new AppClient();

if (process.env.NODE_ENV !== 'production') {
    global.appPrisma = appPrisma;
}

export { appPrisma };
