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
      { title: "Is Really Hot", image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Mercury_Globe-MESSENGER_mosaic_centered_at_0degN-0degE.jpg", estate: "Mercury", area: 300, rent: 7000, bedrooms: 7, tenants: 7, highlight: "dummy" },
      { title: "Godlen Star", image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg", estate: "Venus", area: 500, rent: 8000, bedrooms: 9, tenants: 9, highlight: "dummy" },
      { title: "You are so Big!", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/PIA02879_-_A_New_Year_for_Jupiter_and_Io.jpg", estate: "Jupiter", area: 3000, rent: 9000, bedrooms: 10, tenants: 10, highlight: "dummy" },
      { title: "A Small Red Ball", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/1920px-OSIRIS_Mars_true_color.jpg", estate: "Mars", area: 1000, rent: 40000, bedrooms: 11, tenants: 11, highlight: "dummy" },
      // etc.
    ]);

  }

  if (await User.count() == 0) {
    const hash = await sails.bcrypt.hash('123456', saltRounds);

    await User.createEach([
      { username: "zym", password: hash },
      { username: "boss", password: hash },
      // etc.
      { username: "ytm", password: hash },
      { username: "batman", password: hash }
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
