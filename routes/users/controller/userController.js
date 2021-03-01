const User = require("../model/User");

var axios = require("axios")

module.exports = {
    signup: async (req, res)=> {
        
        const {firstName, lastName, email, password} = req.body;

        try {
            const createdUser = new User({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                password: password
            });
            let savedUser = await createdUser.save()
            // res.redirect("/users/home")
            // res.render("home-page", {user: req.body.email, success: savedUser})
            res.render("sign-up", {success: savedUser, error: null});
    
        } catch(error){
            res.status(500).json({
                message: "error",
                errorMessage: error.message
            });
        }
    },
    login: async (req, res) => {
        try {
            let foundUser = await User.findOne({email: req.body.email});
            if(!foundUser) {
                res.render("log-in", {success: false, error: "User Not Found"
                })
            } else {
                if(req.body.password === foundUser.password) {
                    req.session.user = {
                        _id: foundUser._id,
                        email: foundUser.email
                    };
                    res.redirect("/users/home");
                    res.render("home-page", {user: foundUser.email});
                } else {
                    res.render("log-in", {success: false, error: "Check email or password"
                    })
                }
            }
        } catch (error) {
            res.status(500).json({
                message: "error",
                errorMessage: error.message
            })
        }
    },
    homePage: async(req, res) => {
        console.log(req.body.search);
        if(req.session.user) {
            try{
                let result = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${req.body.search}&appid=${process.env.WEATHER_API}`);
                console.log(result.data)
                res.render("home-page", {data: result.data, user: req.session.user.email});
            } catch (e) {
                res.status(500).json({
                message: "failure",
                data: e.message
                });
            }
        } else {
            res.render("access-error", {error: true});
            }
            next();
    }
    
};