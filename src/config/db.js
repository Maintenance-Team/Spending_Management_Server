import { PrismaClient } from '@prisma/client';

// create an Prisma instance connect to Postgresql

const logQuery = (instance) => {
  instance.$on('query', (e) => {
    console.log('🚀🚀🚀----------------------------------');
    console.log('Query: ' + e.query + '\n');
  });
};

const connect = () => {
  // Set option log query
  const logging = false;

  const prisma = new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
    ],
  });

  if (logging) logQuery(prisma);

  return prisma;
};

export default connect();
