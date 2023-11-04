# prisma--node-ts
a node typescript starter with prisma

# Install Prisma CLI
npm install -g prisma

# Install project dependencies
npm install

# Create a .env file with the database credentials
echo "DATABASE_URL=postgresql://user:password@localhost:5432/dbname?schema=public" > .env

# Run database migrations with Prisma
prisma migrate dev

# Start the project
npm run dev
