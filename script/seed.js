"use strict";

const {
  db,
  models: { User, Product },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      email: "iris123@gmail.com",
      password: "123",
      firstName: "Iris",
      lastName: "H",
      isAdmin: true,
    }),
    User.create({
      email: "shristi123@gmail.com",
      password: "123",
      firstName: "Shristi",
      lastName: "G",
      isAdmin: true,
    }),
    User.create({
      email: "nate123@gmail.com",
      password: "123",
      firstName: "Nate",
      lastName: "M",
      isAdmin: true,
    }),
    User.create({
      email: "allie123@gmail.com",
      password: "123",
      firstName: "Allison",
      lastName: "C",
      isAdmin: true,
    }),
    User.create({
      email: "cody@gmail.com",
      password: "123",
      firstName: "Cody",
      lastName: "Pug",
      isAdmin: false,
    }),
    User.create({
      email: "winniethepooh@gmail.com",
      password: "123",
      firstName: "Winnie",
      lastName: "Pooh",
      isAdmin: false,
    }),
    User.create({
      email: "piglet@gmail.com",
      password: "123",
      firstName: "Piglet",
      lastName: "Piglet",
      isAdmin: false,
    }),
  ]);

  // Creating products
  const products = await Promise.all([
    Product.create({
      name: "Time Travel",
      imgUrl:
        "https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F210730141728-jodie-whitaker-doctor-who.jpg",
      price: 399.99,
      description: "Travel through time like the Doctor!",
    }),
    Product.create({
      name: "Teleportation",
      imgUrl:
        "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2015/11/teleportation-portals.jpg",
      price: 299.99,
      description: "Never wait in traffic again!",
    }),
    Product.create({
      name: "Invisibility",
      price: 399.99,
      description: "Not even your shadow will find you!",
    }),
    Product.create({
      name: "Flying",
      imgUrl: "https://i.ytimg.com/vi/U6v1K3-Ssfc/maxresdefault.jpg",
      price: 199.99,
      description:
        "Want to fly through the air with the greatest of ease? Look no further!",
    }),
    Product.create({
      name: "Superhuman Strength",
      price: 299.99,
      description: "Weightlift your house!",
    }),
    Product.create({
      name: "Shapeshifting",
      price: 299.99,
      description: "Everyday is Halloween!",
    }),
    Product.create({
      name: "Super Speed",
      price: 199.99,
      description: "Blink and you might miss it!",
    }),
    Product.create({
      name: "Telekinesis",
      price: 99.99,
    }),
    Product.create({
      name: "Power Absorption",
      price: 99.99,
      description: "Works like a sponge!",
    }),
    Product.create({
      name: "Transform Into a Plant!",
      imgUrl:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/247749f3-079e-4553-bce4-c972bc97807e/dbrwu7o-20eb4c47-2a50-4c37-8598-31c361103083.jpg/v1/fill/w_286,h_350,q_70,strp/paje_makes_like_a_tree_by_fullmoonmaster_dbrwu7o-350t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI1MyIsInBhdGgiOiJcL2ZcLzI0Nzc0OWYzLTA3OWUtNDU1My1iY2U0LWM5NzJiYzk3ODA3ZVwvZGJyd3U3by0yMGViNGM0Ny0yYTUwLTRjMzctODU5OC0zMWMzNjExMDMwODMuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.1IaD6mTXLexcDTmN3_PQUnWTrzHHXjxy5DfGbjeMXWM",
      price: 59.99,
      description: "Go green!",
    }),
    Product.create({
      name: "Tolerance for Disgusting Smells",
      imgUrl:
        "https://images.theconversation.com/files/351273/original/file-20200805-24-z254sc.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
      price: 59.99,
      description: "Your nose will thank you!",
    }),
    Product.create({
      name: "Patience with Small Children",
      price: 199.99,
      description: "The very best for your little one!",
    }),
    Product.create({
      name: "Cure for Allergies",
      price: 99.99,
      description: "You can stop and smell all the roses!",
    }),
    Product.create({
      name: "Foresight about Purchases",
      price: 599.99,
      description: "Make FOMO a thing of the past!",
    }),
    Product.create({
      name: "Perfect Spelling in the English Language",
      price: 199.99,
      description: "Be your own spell-checker!",
    }),
    Product.create({
      name: "Supersonic Hearing",
      price: 99.99,
      description: "Befriend some bats!",
    }),
    Product.create({
      name: "X-Ray Vision",
      price: 399.99,
      description: "Like skeletons? See them all!",
    }),
    Product.create({
      name: "Microscopic Vision",
      price: 399.99,
      description: "Explore a whole new world!",
    }),
    Product.create({
      name: "Retain Body Temperature in All Climates",
      price: 399.99,
      description: "Travel the world without a suitcase!",
    }),
    Product.create({
      name: "Make Snacks Appear at Will",
      price: 499.99,
      description: "Tasty treats for any occasion!",
    }),
    Product.create({
      name: "Understand all languages ",
      price: 299.99,
      imgUrl: "https://proverbsy.com/wp-content/uploads/Languages.jpg",
      description:
        "you'd never have a problem ordering meals no matter where in the world you might find yourself.",
    }),

    Product.create({
      name: "SuperHuman Invention Skills",
      imgUrl:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DxkZv3N9Gr8o&psig=AOvVaw00x4ABeFbHKdp_fSOsVyaW&ust=1628189229231000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPDAz9qDmPICFQAAAAAdAAAAABAD",
      price: 59.99,
      description: "invent with no limitation",
    }),
    Product.create({
      name: "Waterbreathing",
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThuDNIShL75in_rW9GjP6TC7FD5IkAorKtYw&usqp=CAU",
      price: 59.99,
      description: "You will be able to breathe underwater",
    }),
    Product.create({
      name: "Super hearing",
      imgUrl:
        "http://www.hearinglikeme.com/wp-content/uploads/2014/05/blueeardeafsuperhero.jpg",
      price: 59.99,
      description: "You will be able to hear as far as hundred miles",
    }),
    Product.create({
      name: "Steel Skin",
      imgUrl:
        "http://www.hearinglikeme.com/wp-content/uploads/2014/05/blueeardeafsuperhero.jpg",
      price: 59.99,
    }),
  ]);

  console.log(`seeded successfully`);
  return {
    users,
    products,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
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
