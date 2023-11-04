import { Prisma } from '@prisma/client';

export default Prisma.defineExtension((client) =>
  client.$extends({
    model: {
      $allModels: {
        async getvalues<T, K extends Prisma.Result<T, null, 'findMany'>>(
          this: T,
          field: keyof K[0],
          where: Prisma.Args<T, 'findMany'>['where']
        ) {
          const context = Prisma.getExtensionContext(this);
          const result = await (context as any).findMany({
            where,
            select: { [field]: true },
          });
          return result.map((item: any) => item[field]);
        },
      },
    },
  })
);
