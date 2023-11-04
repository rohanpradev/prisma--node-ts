import { PrismaClient } from '@prisma/client';
import getValues from '../../prisma/extensions/getValues';

export default new PrismaClient().$extends(getValues);
