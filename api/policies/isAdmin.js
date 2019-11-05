// isAdmin.js
module.exports = async function (req, res, proceed) {

    if (req.session.username == 'zym'||req.session.username == 'boss') {
        return proceed();   //proceed to the next policy,
    }

    //--•
    // Otherwise, this request did not come from a logged-in user.
    return res.forbidden();

};