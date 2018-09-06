let jwt = require('jsonwebtoken');
let config = require('../config');
let userinfo = require('./users');

let normalSidebar = [{
        "name": "Profile",
        "url": "/Dashboard",
        "type": "link",
        "details": "Go to Dashboard",
        "class": {
            "li": "",
            "a": ""
        }
    },
    {
        "name": "Wishlist",
        "url": "/Dashboard/Wishlist",
        "type": "link",
        "details": "Wishlist",
        "class": {
            "li": "",
            "a": ""
        }
    },
    {
        "name": "My Demands",
        "url": "/Dashboard/Demands",
        "type": "link",
        "details": "Your demands on products",
        "class": {
            "li": "",
            "a": ""
        }
    },
    {
        "name": "Shopping History",
        "url": "/Dashboard/Shopping-History",
        "type": "link",
        "details": "View Your Shopping History",
        "class": {
            "li": "",
            "a": ""
        }
    },
    {
        "name": "Offers",
        "url": "",
        "type": "dropdown",
        "class": {
            "li": "",
            "a": ""
        },
        "details": [{
                "name": "Bundles",
                "url": "/Shop/Bundles",
                "class": {
                    "li": "",
                    "a": ""
                }
            },
            {
                "name": "Discount Sale",
                "url": "/Shop/Discount-Sale",
                "class": {
                    "li": "",
                    "a": ""
                }
            }
        ]
    }
];
let adminSidebar = [{
        "name": "Manage Shop",
        "url": "/Admin/Shop",
        "type": "link",
        "details": "Go to Dashboard",
        "class": {
            "li": "",
            "a": ""
        }
    },
    {
        "name": "Manage Blogs",
        "url": "/Admin/Blogs",
        "type": "link",
        "details": "View Your Shopping History",
        "class": {
            "li": "",
            "a": ""
        }
    }, {
        "name": "Manage Users",
        "url": "/Admin/Users",
        "type": "link",
        "details": "View Your Shopping History",
        "class": {
            "li": "",
            "a": ""
        }
    }, {
        "name": "Manage Promotions",
        "url": "/Admin/Promotions",
        "type": "link",
        "details": "View Your Shopping History",
        "class": {
            "li": "",
            "a": ""
        }
    }, {
        "name": "Website Settings",
        "url": "/Admin/Website",
        "type": "link",
        "details": "View Your Shopping History",
        "class": {
            "li": "",
            "a": ""
        }
    }
];

// Side bar for Super Admin
let SuperSidebar = [{
        "name": "Manage Shop",
        "url": "/Admin/Shop",
        "type": "link",
        "details": "Go to Dashboard",
        "class": {
            "li": "",
            "a": ""
        }
    },
    {
        "name": "Manage Offers",
        "url": "",
        "type": "dropdown",
        "class": {
            "li": "",
            "a": ""
        },
        "details": [{
                "name": "Bundles",
                "url": "/Admin/Bundles",
                "class": {
                    "li": "",
                    "a": ""
                }
            },
            {
                "name": "Discount Sale",
                "url": "/Admin/Discount-Sale",
                "class": {
                    "li": "",
                    "a": ""
                }
            }
        ]
    },
    {
        "name": "Manage Blogs",
        "url": "/Admin/Blogs",
        "type": "link",
        "details": "View Your Shopping History",
        "class": {
            "li": "",
            "a": ""
        }
    }, {
        "name": "Manage Users",
        "url": "/Admin/Users",
        "type": "link",
        "details": "View Your Shopping History",
        "class": {
            "li": "",
            "a": ""
        }
    }, {
        "name": "Manage Promotions",
        "url": "/Admin/Promotions",
        "type": "link",
        "details": "View Your Shopping History",
        "class": {
            "li": "",
            "a": ""
        }
    }, {
        "name": "Website Settings",
        "url": "/Admin/Website",
        "type": "link",
        "details": "View Your Shopping History",
        "class": {
            "li": "",
            "a": ""
        }
    }
];


let normal = () => {
    return normalSidebar;
};


let admin = async (req) => {
    let result;
    let user = await userinfo.getUser(req);

    if(user !== false){
        usertype = user.usertype;
        usertype = usertype.split(".");
        if (usertype[0] == 'Admin') {
            result = adminSidebar;
        } else {
            result = false;
        }
    }
    return result;
}

let superadmin = async (req) => {
    let result;
    let user = await userinfo.getUser(req);

    if(user !== false){
        usertype = user.usertype;
        usertype = usertype.split(".");
        if (usertype[1] == 'Super') {
            result = adminSidebar;
        } else {
            result = false;
        }
    }
    return result;
};

module.exports = {
    normal,
    admin,
    superadmin
};