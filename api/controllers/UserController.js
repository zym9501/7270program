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

            sails.log("[Session] ", req.session);

            //return res.ok("Login successfully.");
            return res.redirect("/");

        });

    },

    logout: async function (req, res) {

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            return res.ok("Log out successfully.");

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

    

};

