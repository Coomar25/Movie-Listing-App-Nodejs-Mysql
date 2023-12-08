// Example import statement
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


const checkPrismaConnection = async () => {
    try {
      await prisma.$connect();
      console.log('Prisma Connected to the database');
    } catch (error) {
      console.error(' Prisma Error connecting to the database:', error);
    }
    
    // finally {
    //   await prisma.$disconnect();
    //   console.log('Prisma Disconnected from the database');
    // }
  
}  
 
export default checkPrismaConnection;