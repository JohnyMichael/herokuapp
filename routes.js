
// Route Addresses
let authroutes = require('./routes/auth')();
let dashboardroutes = require('./routes/dashboard')();
let adminRoutes = require('./routes/admin')();
let generalRoutes = require('./routes/index');
let apiRoutes = require('./routes/api');


module.exports = (app) => {
    // Using Routes
    app.use('/Auth', authroutes);
    app.use('/Dashboard', dashboardroutes);
    app.use('/Admin', adminRoutes);
    apiRoutes(app);
    
    generalRoutes(app);
};