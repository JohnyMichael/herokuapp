const shopHelper = require('../chunks/shophelper');
const usermiddleware = require('../middlewares/users');
function router(app) {
    let Category = require('../models/categories');
    app.post('/api/subcatbycatid', async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        let catid = req.body.catid;
        let subcats = await shopHelper.subcatbycatid(catid);
        res.json({subcats: subcats});
    });
    
}

module.exports = router;