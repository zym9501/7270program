/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');

        if (!req.body.username || !req.body.password) return res.badRequest();

        var user = await User.findOne({ username: req.body.username });

        if (!user) return res.status(401).send("User not found");


        const match = await sails.bcrypt.compare(req.body.password, user.password);

        if (!match) return res.status(401).send("Wrong Password");
        // if (user.password != req.body.password)
        // return res.status(401).send("Wrong Password");

        req.session.regenerate(async function (err) {

            if (err) return res.serverError(err);

            req.session.username = req.body.username;
            req.session.userId = user.id;
            req.session.role = user.role;


            sails.log("[Session] ", req.session);

            //return res.ok("Login successfully.");
            return res.redirect("/");

        });

    },

    logout: async function (req, res) {

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            return res.redirect("/");

        });
    },

    // action - create
    create: async function (req, res) {
        if (req.method == "GET")
            return res.view('user/create');

        if (!req.body.User)
            return res.badRequest("Form-data not received.");



        console.log(req.body.User)
        await User.create(req.body.User);

        return res.redirect('/user/login');
    },

    populate: async function (req, res) {


        var model = await User.findOne(req.params.id).populate("Own");

        if (!model) return res.notFound();

        return res.json(model);

    },

    add: async function (req, res) {

        if (!await User.findOne(req.session.userId)) return res.notFound();

        const thatPerson = await Project.findOne(req.params.fk).populate("rentedby", { id: req.session.userId });

        if (!thatPerson) return res.notFound();

        if (thatPerson.rentedby.length)
            return res.status(409).send("Already added.");   // conflict

        await User.addToCollection(req.session.userId, "Own").members(req.params.fk);

        //return res.redirect('/project/myrentals');
        return res.ok('Operation completed.');

    },

    remove: async function (req, res) {

        if (!await User.findOne(req.session.userId)) return res.notFound();

        const thatPerson = await Project.findOne(req.params.fk).populate("rentedby", { id: req.session.userId });

        if (!thatPerson) return res.notFound();

        if (!thatPerson.rentedby.length)
            return res.status(409).send("Nothing to delete.");    // conflict

        await User.removeFromCollection(req.session.userId, "Own").members(req.params.fk);

        //return res.redirect('/project/myrentals');
        return res.ok('Operation completed.');

    },
     // json function
     json: async function (req, res) {

        var project = await User.find();

        return res.json(project);
    },

    //M3 supporting
    



};

