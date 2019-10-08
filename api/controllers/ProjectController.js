/**
 * ProjectController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // action - index
    index: async function (req, res) {
        return res.view('Project/index');

    },


    // action - create
    create: async function (req, res) {

        if (req.method == "GET")
            return res.view('person/create');

        if (!req.body.Person)
            return res.badRequest("Form-data not received.");

        await Person.create(req.body.Person);

        return res.ok("Successfully created!");
    },

};

