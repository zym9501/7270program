/**
 * ProjectController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // action - index
    index: async function (req, res) {
        var model = await Project.find({
            where: { 'highlight': { '!=': '' } },
            limit: 4
        })
            .sort([{ id: 'DESC' },]);

        return res.view('project/index', { homepage: model });

    },


    // action - create
    create: async function (req, res) {

        if (req.method == "GET")
            return res.view('project/create');

        if (!req.body.Project)
            return res.badRequest("Form-data not received.");

        var DB = req.body.Project;

        DB['createdate'] = new Date().toLocaleDateString();
        DB['updatedate'] = new Date().toLocaleDateString();

        console.log(req.body.Project)
        await Project.create(req.body.Project);

        return res.ok("Successfully created!");
    },



    // action - admin
    admin: async function (req, res) {
        const numOfItemsPerPage = 2;
        var models = await Project.find();
        var numOfPage = Math.ceil(await Project.count());
        console.log(models);
        return res.view('project/admin', { key: models, count: numOfPage });

    },




    // action - detail
    detail: async function (req, res) {
        var model = await Project.findOne(req.params.id);

        if (!model) return res.notFound();

        var restate = await Project.findOne(req.params.id).populate('rentedby');
        numOfrentals= restate.rentedby.length;
        //var customs = await Project.find({ where: { id: req.params.id } }).populate("rentedby");
        console.log(numOfrentals);
        //return res.json(restate.rentedby[0]['username']);
        //return res.view('project/detail', { details: model, nor:numOfrentals,key: customs[0]['username'] });
        return res.view('project/detail', { details: model, nor:numOfrentals,key: restate.rentedby[0]['username'] });

    },

    // json function
    json: async function (req, res) {

        var project = await Project.find();

        return res.json(project);
    },

    // action - update
    update: async function (req, res) {

        if (req.method == "GET") {

            var model = await Project.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('project/update', { details: model });

        } else {

            if (!req.body.Project)
                return res.badRequest("Form-data not received.");

            var models = await Project.update(req.params.id).set({
                title: req.body.Project.title,
                estate: req.body.Project.estate,
                rent: req.body.Project.rent,
                image: req.body.Project.image,
                bedrooms: req.body.Project.bedrooms,
                tenants: req.body.Project.tenants,
                area: req.body.Project.area,
                highligth: req.body.Project.highligth,
                updatedate: new Date().toLocaleDateString()

            }).fetch();

            if (models.length == 0) return res.notFound();

            // return res.ok("Record updated");
            return res.redirect("/project/admin");

        }
    },
    // action - delete 
    delete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        // var models = await Project.destroy(req.params.id).fetch();

        // if (models.length == 0) return res.notFound();

        // return res.ok("Deleted.");
        if (req.wantsJSON) {
            return res.json({ message: "Person deleted.", url: '/project/admin' });    // for ajax request
        } else {
            return res.redirect("/project/admin");          // for normal request
        }

    },

    // search function
    search: async function (req, res) {

        const qPage = Math.max(req.query.page - 1, 0) || 0;

        const numOfItemsPerPage = 2;

        if (!req.query.Project) {

            const sestate = "";
            const sbedrooms = "";
            const sareamax = "";
            const sareamin = "";
            const srentmax = "";
            const srentmin = "";

            var sq = { sestate, sbedrooms, sareamax, sareamin, srentmax, srentmin, };

            var models = await Project.find({
                limit: numOfItemsPerPage,
                skip: numOfItemsPerPage * qPage
            });
            var numOfPage = Math.ceil(await Project.count({ where: poi }) / numOfItemsPerPage);
            return res.view('project/search', { nico: models, count: numOfPage, SQ: sq });
        }
        else {
            const sestate = req.query.Project.estate || "";
            const sbedrooms = parseInt(req.query.Project.bedrooms) || 1;
            const sareamax = parseInt(req.query.Project.maxarea) || 900000;
            const sareamin = parseInt(req.query.Project.minarea) || 1;
            const srentmax = parseInt(req.query.Project.maxrent) || 900000;
            const srentmin = parseInt(req.query.Project.minrent) || 1;

            var sq = { sestate, sbedrooms, sareamax, sareamin, srentmax, srentmin, };

            var poi = {
                area: { '>=': sareamin, '<=': sareamax, },
                rent: { '>=': srentmin, '<=': srentmax, },
                estate: { contains: sestate },
            };
            console.log(poi);

            if (isNaN(sbedrooms)) {

                var models = await Project.find({
                    where: poi,
                    limit: numOfItemsPerPage,
                    skip: numOfItemsPerPage * qPage
                });

            } else {

                var models = await Project.find({
                    where: poi,
                    limit: numOfItemsPerPage,
                    skip: numOfItemsPerPage * qPage
                });

            }

            console.log(sq);
            var numOfPage = Math.ceil(await Project.count({ where: poi }) / numOfItemsPerPage);
            return res.view('project/search', { nico: models, count: numOfPage, SQ: sq });
        }
    },


    populate: async function (req, res) {

        var model = await Project.findOne(req.params.id).populate("rentedby");

        if (!model) return res.notFound();

        return res.json(model);

    },

    myrentals: async function (req, res) {

        var duang = await User.find({ where: { username: { contains: req.session.username }, }, }).populate("Own");
        if (!duang) return res.notFound();

        // console.log(count(duang[0]['Own']));
        // return res.json(duang);

        return res.view('project/myrentals', { homepage: duang[0]['Own'] });

    },

    occupants: async function (req, res) {


        var model = await Project.find({ where: { id: req.params.id } }).populate("rentedby");

        if (!model) return res.notFound();
        // return res.json(model);
        return res.view('project/occupants', { key: model[0]['rentedby'] });

    },
};

