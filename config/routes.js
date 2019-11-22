/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // '/': { view: 'pages/homepage' },
  '/': 'ProjectController.index',
  //SET YOUR PAGE HERE
  'GET /project/index': 'ProjectController.index',
  'GET /project/create': 'ProjectController.create',
  'POST /project/create': 'ProjectController.create',
  'GET /project/search': 'ProjectController.search',
  'POST /project/search': 'ProjectController.search',
  'GET /project/admin': 'ProjectController.admin',
  // 'GET /project/detail':'ProjectController.detail',
  //'GET /project/update':'ProjectController.admin',

  'GET /project/detail/:id': 'ProjectController.detail',

  'GET /project/update/:id': 'ProjectController.update',
  'POST /project/update/:id': 'ProjectController.update',
  'POST /project/delete/:id': 'ProjectController.delete',
  'GET /project/occupants/:id':'ProjectController.occupants',

  'GET /project/json': 'ProjectController.json',
  'GET /project/myrentals': 'ProjectController.myrentals',
  'GET /project/:id/rentedby': 'ProjectController.populate',

  //User
  'GET /user/login': 'UserController.login',
  'POST /user/login': 'UserController.login',
  'GET /user/logout': 'UserController.logout',
  'POST /user/create': 'UserController.create',
  'GET /user/create': 'UserController.create',
  'GET /user/:id/own': 'UserController.populate',
  'PATCH /user/own/:fk': 'UserController.add',
  'DELETE /user/own/:fk': 'UserController.remove',


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
