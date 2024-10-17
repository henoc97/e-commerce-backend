import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Créer des utilisateurs
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'client1@example.com',
        password: 'password123',
        name: 'Client User 1',
        role: 'CLIENT',
      },
    }),
    prisma.user.create({
      data: {
        email: 'client2@example.com',
        password: 'password123',
        name: 'Client User 2',
        role: 'CLIENT',
      },
    }),
    prisma.user.create({
      data: {
        email: 'client3@example.com',
        password: 'password123',
        name: 'Client User 3',
        role: 'CLIENT',
      },
    }),
    prisma.user.create({
      data: {
        email: 'client4@example.com',
        password: 'password123',
        name: 'Client User 4',
        role: 'CLIENT',
      },
    }),
    prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: 'adminpassword',
        name: 'Admin User',
        role: 'ADMIN',
      },
    }),
  ]);

  // Créer des produits
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Produit Exemple 1',
        description: 'Ceci est un produit exemple 1.',
        price: 29.99,
        stock: 100,
        category: {
          create: {
            name: 'Catégorie Exemple 1',
          },
        },
        shop: {
          create: {
            name: 'Boutique Exemple 1',
            url: 'https://boutique-exemple1.com',
            vendor: {
              create: {
                user: {
                  connect: { id: users[0].id },
                },
                storeName: 'Magasin de Client 1',
              },
            },
          },
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Produit Exemple 2',
        description: 'Ceci est un produit exemple 2.',
        price: 39.99,
        stock: 200,
        category: {
          create: {
            name: 'Catégorie Exemple 2',
          },
        },
        shop: {
          create: {
            name: 'Boutique Exemple 2',
            url: 'https://boutique-exemple2.com',
            vendor: {
              create: {
                user: {
                  connect: { id: users[1].id },
                },
                storeName: 'Magasin de Client 2',
              },
            },
          },
        },
      },
    }),
    // Ajoutez plus de produits ici
  ]);

  // Créer des commandes
  await Promise.all([
    prisma.order.create({
      data: {
        user: {
          connect: { id: users[0].id },
        },
        shop: {
          connect: { id: products[0].shopId },
        },
        items: {
          create: {
            product: {
              connect: { id: products[0].id },
            },
            quantity: 2,
            price: products[0].price,
          },
        },
        status: 'PENDING',
        totalAmount: products[0].price * 2,
        shippingMethod: 'STANDARD',
      },
    }),
    prisma.order.create({
      data: {
        user: {
          connect: { id: users[1].id },
        },
        shop: {
          connect: { id: products[1].shopId },
        },
        items: {
          create: {
            product: {
              connect: { id: products[1].id },
            },
            quantity: 1,
            price: products[1].price,
          },
        },
        status: 'PENDING',
        totalAmount: products[1].price,
        shippingMethod: 'EXPRESS',
      },
    }),
    // Ajoutez plus de commandes ici
  ]);

  console.log('Données de seed insérées avec succès.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
