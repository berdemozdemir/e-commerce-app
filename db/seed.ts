import 'dotenv/config';
import {
  accounts,
  products,
  sessions,
  users,
  verificationTokens,
} from '../server';
import { db } from '../server/drizzle-client';
import sampleData from './sample-data';

export async function seed() {
  await db.delete(products);
  await db.delete(accounts);
  await db.delete(sessions);
  await db.delete(verificationTokens);
  await db.delete(users);

  const fixedData = sampleData.products.map((p) => ({
    ...p,
    price: p.price.toString(),
    rating: p.rating.toString(),
  }));

  await db.insert(products).values(fixedData);
  console.log('Products seeded successfully');

  await db.insert(users).values(sampleData.users);
  console.log('Users seeded successfully');
}

seed()
  .then(() => {
    console.log('Seeding completed successfully');
  })
  .catch((error) => {
    console.error('Error seeding data:', error);
  });
