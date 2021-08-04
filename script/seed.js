'use strict';

const {
  db,
  models: { User, Product },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({
      email: 'iris123@gmail.com',
      password: '123',
      firstName: 'iris',
      lastName: 'h',
      isAdmin: true,
    }),
    User.create({
      email: 'shristi123@gmail.com',
      password: '123',
      firstName: 'shristi',
      lastName: 'g',
      isAdmin: true,
    }),
  ]);

  // Creating products
  const products = await Promise.all([
    Product.create({
      name: 'Time travel',
      imgUrl:
        'https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F210730141728-jodie-whitaker-doctor-who.jpg',
      price: 399.99,
      description: 'Travel through time like the Doctor!',
    }),
    Product.create({
      name: 'Teleportation',
      imgUrl:
        'https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2015/11/teleportation-portals.jpg',
      description: '',
    }),
    Product.create({
      name: 'Flying',
      imgUrl: 'https://i.ytimg.com/vi/U6v1K3-Ssfc/maxresdefault.jpg',
      description:
        'Want to fly through the air with the greatest of ease! Look no further!',
    }),
    Product.create({
      name: 'Transform into a plant!',
      imgUrl:
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/247749f3-079e-4553-bce4-c972bc97807e/dbrwu7o-20eb4c47-2a50-4c37-8598-31c361103083.jpg/v1/fill/w_286,h_350,q_70,strp/paje_makes_like_a_tree_by_fullmoonmaster_dbrwu7o-350t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI1MyIsInBhdGgiOiJcL2ZcLzI0Nzc0OWYzLTA3OWUtNDU1My1iY2U0LWM5NzJiYzk3ODA3ZVwvZGJyd3U3by0yMGViNGM0Ny0yYTUwLTRjMzctODU5OC0zMWMzNjExMDMwODMuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.1IaD6mTXLexcDTmN3_PQUnWTrzHHXjxy5DfGbjeMXWM',
    }),
    Product.create({
      name: 'Tolerance for disgusting smells',
      imgUrl:
        'https://images.theconversation.com/files/351273/original/file-20200805-24-z254sc.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop',
    }),
    Product.create({
      name: 'Patience with small children',
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
