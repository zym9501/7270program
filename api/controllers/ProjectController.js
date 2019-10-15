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
            where: { 'highligth': { '!=': 'dummy' } },
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

    // search function
    search: async function (req, res) {

        return res.view('project/search');
    },

    // action - admin
    admin: async function (req, res) {
        const numOfItemsPerPage = 2;
        var models = await Project.find();
        var numOfPage = Math.ceil(await Project.count());
        console.log(models);
        return res.view('project/admin', { key: models , count: numOfPage});

    },

    // action - paginate
    paginate: async function (req, res) {

        const qPage = Math.max(req.query.page - 1, 0) || 0;

        const numOfItemsPerPage = 2;

        var models = await Project.find({
            limit: numOfItemsPerPage,
            skip: numOfItemsPerPage * qPage
        });
        
        var numOfPage = Math.ceil(await Project.count() / numOfItemsPerPage);
        
        console.log(numOfPage);
        return res.view('project/search', { persons: models, count: numOfPage });
        
    },


    // action - detail
    detail: async function (req, res) {
        var model = await Project.findOne(req.params.id);
        
        if (!model) return res.notFound();
       
        console.log(model);
        return res.view('project/detail', { details: model });

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
            console.log(models);
            return res.ok("Record updated");

        }
    },
    // action - delete 
    delete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await Project.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        return res.ok("Deleted.");

    },

};

