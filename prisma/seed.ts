import { PrismaClient, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const generateUserData = (): Prisma.UserCreateInput => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  posts: {
    create: [
      {
        title: faker.lorem.sentence(),
        published: Math.random() < 0.5,
        likeNum: faker.number.int({ max: 500 }),
        categories: {
          create: [
            {
              name: faker.company.buzzPhrase(),
            },
            {
              name: faker.company.buzzPhrase(),
            },
          ],
        },
      },
    ],
  },
});

async function main() {
  const promises: any[] = [];
  console.time('Seeding ...');
  for (let i = 0; i < 10; i++) {
    const data = generateUserData();
    promises.push(prisma.user.create({ data }));
  }
  await Promise.all(promises);
  console.timeEnd('Seeding ...');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
