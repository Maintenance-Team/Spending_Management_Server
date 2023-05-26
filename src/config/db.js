import { PrismaClient } from '@prisma/client';

// create an Prisma instance connect to Postgresql

const logQuery = (instance) => {
  instance.$on('query', (e) => {
    console.log('🚀🚀🚀----------------------------------');
    console.log('Query: ' + e.query + '\n');
  });
};

const connect = async () => {
  // Set option log query
  const logging = false;

  try {
    const prisma = await new PrismaClient({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
    console.log('connect to DB successfully!!!');

    if (logging) logQuery(prisma);

    return prisma;
  } catch (err) {
    console.log('connect to DB failure!!!');
  }
};

export default connect();
