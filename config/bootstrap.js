/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  sails.bcrypt = require('bcryptjs');
  const saltRounds = 10;

  if (await Project.count() == 0) {

    await Project.createEach([
      { title: "Is Really Hot", image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Mercury_Globe-MESSENGER_mosaic_centered_at_0degN-0degE.jpg", estate: "Mercury", area: 300, rent: 7000, bedrooms: 7, tenants: 7, highlight: "dummy", place:"Royal+Observatory+Greenwich/@51.4768563,-0.0026889,17z/data=!3m1!4b1!4m5!3m4!1s0x47d8a82a8ca9dca7:0x31abb25f451c8402!8m2!3d51.476853!4d-0.0005002?hl=en"},
      { title: "Godlen Star", image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg", estate: "Venus", area: 500, rent: 8000, bedrooms: 9, tenants: 9, highlight: "dummy", place:"Observatorio+Astronomico+De+Mallorca/@39.6423549,2.9482118,17z/data=!3m1!4b1!4m5!3m4!1s0x1297c86efa2e09a9:0xbe2bdfbd1637a4f3!8m2!3d39.6423508!4d2.9504005?hl=en" },
      { title: "You are so Big!", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/PIA02879_-_A_New_Year_for_Jupiter_and_Io.jpg", estate: "Jupiter", area: 3000, rent: 9000, bedrooms: 10, tenants: 10, highlight: "dummy", place:"Griffith+Observatory/@34.1184616,-118.3024398,16.34z/data=!4m5!3m4!1s0x80c2bf61e9d408cb:0x73ff07b1c2d6dadc!8m2!3d34.1184341!4d-118.3003935?hl=en" },
      { title: "A Small Red Ball", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/1920px-OSIRIS_Mars_true_color.jpg", estate: "Mars", area: 1000, rent: 40000, bedrooms: 11, tenants: 11, highlight: "dummy", place:"Hong+Kong+Observatory/@22.3140756,113.9201125,11z/data=!4m8!1m2!2m1!1sObservatory!3m4!1s0x340400eeae973739:0xdeabafd0c57183bc!8m2!3d22.3022564!4d114.1741514" },
      // etc.
    ]);

  }

  if (await User.count() == 0) {
    const hash = await sails.bcrypt.hash('123456', saltRounds);

    await User.createEach([
      { username: "zym", password: hash, role:'admin' },
      { username: "boss", password: hash, role:'admin' },
      // etc.
      { username: "ytm", password: hash, role:'client' },
      { username: "batman", password: hash, role:'client' }
    ]);

  }


  const venus = await Project.findOne({ title: "Godlen Star" });
  const mercury = await Project.findOne({ title: "Is Really Hot" });
  const ytm = await User.findOne({ username: "ytm" });
  const batman = await User.findOne({ username: "batman" });

  await User.addToCollection(batman.id, 'Own').members(venus.id);
  await User.addToCollection(ytm.id, 'Own').members([venus.id, mercury.id]);
  return;
};
