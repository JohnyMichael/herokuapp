let nav = [{
        "name": "Home",
        "url": "/",
        "position": "left",
        "type": "link",
        "details": "Go to Home Page",
        "class": ""
    },
    {
        "name": "About",
        "url": "/About",
        "position": "left",
        "type": "link",
        "details": "Discove information about us",
        "class": ""
    },
    {
        "name": "Blogs",
        "url": "/Blogs",
        "position": "left",
        "type": "link",
        "details": "Discover new blogs.",
        "class": ""
    },
    {
        "name": "Membership",
        "url": "",
        "position": "right",
        "type": "dropdown",
        "class": "",
        "details": [{
                "name": "Register",
                "url": "/Auth/Register",
                "class": ""
            },
            {
                "name": "Sign In",
                "url": "/Auth/Signin",
                "class": ""
            }
        ]
    },
    {
        "name": "Cart",
        "url": "/Cart",
        "position": "right",
        "type": "link",
        "details": "View your Cart",
        "class": ""
    },
];





let setnav = (req) => {
    if (typeof req.cookies.auth !== 'undefined') {
        var membershipDetails = [{
                "name": "Dashboard",
                "url": "/Dashboard",
                "class": ""
            },
            {
                "name": "Account Settings",
                "url": "/Dashboard/Account-Settings",
                "class": ""
            },
            {
                "name": "Change Password",
                "url": "/Dashboard/Change-Password",
                "class": ""
            },
            {
                "name": "Signout",
                "url": "/Logout",
                "class": ""
            }
        ];
        var Auth = [{
                "name": "Register",
                "url": "/Auth/Register",
                "class": ""
            },
            {
                "name": "Sign In",
                "url": "/Auth/Signin",
                "class": ""
            }
        ];
        // Loggedin navbar
        for (let i = 0; i < nav.length; i++) {
            if (nav[i].name == 'Membership') {
                nav[i].name = 'My Account';
                nav[i].details = membershipDetails;
            }
        }
    } else {
        for (let i = 0; i < nav.length; i++) {
            if (nav[i].name == 'My Account') {
                nav[i].name = 'Membership';
                nav[i].details = Auth;
            }
        }
    }
};
let getnav = (req) => {
    setnav(req);
    return nav;
};
module.exports = {
    getnav,
    setnav
};