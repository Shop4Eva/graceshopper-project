'use strict';

const {
  db,
  models: { User, Product, Cart, Product_Cart },
} = require('../server/db');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({
      email: 'iris123@gmail.com',
      password: '123',
      firstName: 'Iris',
      lastName: 'H',
      isAdmin: true,
    }),
    User.create({
      email: 'shristi123@gmail.com',
      password: '123',
      firstName: 'Shristi',
      lastName: 'G',
      isAdmin: true,
    }),
    User.create({
      email: 'nate123@gmail.com',
      password: '123',
      firstName: 'Nate',
      lastName: 'M',
      isAdmin: true,
    }),
    User.create({
      email: 'allie123@gmail.com',
      password: '123',
      firstName: 'Allison',
      lastName: 'C',
      isAdmin: true,
    }),
    User.create({
      email: 'winniethepooh@gmail.com',
      password: '123',
      firstName: 'Winnie',
      lastName: 'Pooh',
      isAdmin: false,
    }),
    User.create({
      email: 'piglet@gmail.com',
      password: '123',
      firstName: 'Piglet',
      lastName: 'Piglet',
      isAdmin: false,
    }),
  ]);

  const cody = await User.create({
    email: 'cody@gmail.com',
    password: '123',
    firstName: 'Cody',
    lastName: 'Pug',
    isAdmin: false,
  });

  // Creating products
  const products = await Promise.all([
    Product.create({
      name: 'Time Travel',
      imgUrl:
        'https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F210730141728-jodie-whitaker-doctor-who.jpg',
      price: 39999,
      description: 'Travel through time like the Doctor!',
    }),
    Product.create({
      name: 'Teleportation',
      imgUrl:
        'https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2015/11/teleportation-portals.jpg',
      price: 29999,
      description: 'Never wait in traffic again!',
    }),
    Product.create({
      name: 'Invisibility',
      imgUrl:
        'https://static.wikia.nocookie.net/mario/images/a/a1/Boo_CTTT.png',
      price: 39999,
      description: 'Boo!',
    }),
    Product.create({
      name: 'Flying',
      imgUrl: 'https://i.ytimg.com/vi/U6v1K3-Ssfc/maxresdefault.jpg',
      price: 19999,
      description:
        'Want to fly through the air with the greatest of ease? Look no further!',
    }),
    Product.create({
      name: 'Superhuman Strength',
      imgUrl:
        'https://images.emojiterra.com/google/android-nougat/512px/1f3cb-2640.png',
      price: 29999,
      description: 'Weightlift your house!',
    }),
    Product.create({
      name: 'Shapeshifting',
      imgUrl:
        'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/is_my_cat_normal_slideshow/1800x1200_is_my_cat_normal_slideshow.jpg',
      price: 29999,
      description: 'You can be anything you want to be!',
    }),
    Product.create({
      name: 'Super Speed',
      imgUrl:
        'http://playingwithsuperpower.com/wp-content/uploads/2013/08/Death-Valley-Rally-4.png',
      price: 19999,
      description: 'Blink and you might miss it!',
    }),
    Product.create({
      name: 'Telekinesis',
      imgUrl: 'https://image.flaticon.com/icons/png/512/779/779473.png',
      price: 9999,
      description: 'Just think of all the things you can do!',
    }),
    Product.create({
      name: 'Power Absorption',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/0701/1713/products/Screen_Shot_2016-10-25_at_9.10.42_AM_300x300.png',
      price: 9999,
      description: 'Works like a sponge!',
    }),
    Product.create({
      name: 'Transform Into a Plant!',
      imgUrl:
        'https://i0.wp.com/i.pinimg.com/originals/c2/20/82/c22082e1376a7021830baa6bb277c589.jpg',
      price: 5999,
      description: 'Go green!',
    }),
    Product.create({
      name: 'Tolerance for Disgusting Smells',
      imgUrl:
        'https://images.theconversation.com/files/351273/original/file-20200805-24-z254sc.jpg',
      price: 5999,
      description: 'Your nose will thank you!',
    }),
    Product.create({
      name: 'Patience with Small Children',
      imgUrl:
        'https://us.123rf.com/450wm/dopop/dopop1501/dopop150100027/37661889-happy-kids.jpg',
      price: 19999,
      description: 'The very best for your little one(s)!',
    }),
    Product.create({
      name: 'Cure for Allergies',
      imgUrl:
        'https://img1.10bestmedia.com/Images/Photos/380645/GettyImages-613758084_54_990x660.jpg',
      price: 9999,
      description: 'You can stop and smell all the roses!',
    }),
    Product.create({
      name: 'Foresight about Purchases',
      imgUrl:
        'https://www.petalrepublic.com/wp-content/uploads/2020/08/Ultimate-Guide-to-Growing-and-Caring-for-Money-Tree-Plants-scaled.jpg',
      price: 59999,
      description: 'Make FOMO a thing of the past!',
    }),
    Product.create({
      name: 'Perfect Spelling in the English Language',
      imgUrl:
        'https://www.theconfidentteacher.com/wp-content/uploads/2017/04/Spelling-tree.png',
      price: 19999,
      description: 'Be your own spell-checker!',
    }),
    Product.create({
      name: 'Supersonic Hearing',
      imgUrl:
        'https://www.treehugger.com/thmb/Oj9b_bSY1KCRiYT-Q67zdlxigoU=/644x439/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2014__03__Dwarf-epauletted-fruit-bat-a4e1590e0ba74b75a33415600c5db4e3.jpg',
      price: 9999,
      description: 'Befriend some bats!',
    }),
    Product.create({
      name: 'X-Ray Vision',
      imgUrl:
        'https://media-ecn.s3.amazonaws.com/embedded_image/2017/10/xray%20vision.jpg',
      price: 39999,
      description: 'Like skeletons? See them all!',
    }),
    Product.create({
      name: 'Microscopic Vision',
      imgUrl:
        'https://cdn.technologynetworks.com/tn/images/thumbs/jpeg/640_360/7-stunning-cell-images-from-2017-294838.jpg',
      price: 39999,
      description: 'Explore a whole new world!',
    }),
    Product.create({
      name: 'Retain Body Temperature in All Climates',
      imgUrl:
        'https://www.france-voyage.com/visuals/pratique/enjoying-climate-year-round-27-1_w500.jpg',
      price: 39999,
      description: 'Travel the world without a suitcase!',
    }),
    Product.create({
      name: 'Make Snacks Appear at Will',
      imgUrl:
        'https://foodal.com/wp-content/uploads/2020/04/The-Best-Variety-of-Pantry-Snacks.jpg',
      price: 49999,
      description: 'Tasty treats for any occasion!',
    }),
    Product.create({
      name: 'Ultimate Language Pack',
      imgUrl: 'https://proverbsy.com/wp-content/uploads/Languages.jpg',
      price: 29999,
      description: 'Understand every language you hear!',
    }),
    Product.create({
      name: 'SuperHuman Invention Skills',
      imgUrl:
        'https://static.scientificamerican.com/sciam/cache/file/987F7B3E-85C1-47D6-91416FCA62F71B37_source.jpg',
      price: 5999,
      description: "Invent to your heart's content!",
    }),
    Product.create({
      name: 'Underwater Breathing',
      imgUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThuDNIShL75in_rW9GjP6TC7FD5IkAorKtYw&usqp=CAU',
      price: 5999,
      description: 'Live like a fish!',
    }),
    Product.create({
      name: 'Steel Skin',
      imgUrl:
        'http://www.hearinglikeme.com/wp-content/uploads/2014/05/blueeardeafsuperhero.jpg',
      price: 5999,
      description: 'Built-in armor for any occasion!',
    }),
  ]);

  const carts = [];

  users.forEach(async (user) => {
    try {
      const newCart = await Cart.create();
      newCart.setUser(user);
      carts.push(newCart);
    } catch (e) {
      console.error(e);
    }
  });

  users.push(cody);

  const codyCart = await Cart.create();
  await cody.setCarts(codyCart);
  carts.push(codyCart);

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

if (module === require.main) {
  runSeed();
}

module.exports = seed;
