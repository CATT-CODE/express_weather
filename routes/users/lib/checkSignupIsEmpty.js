const {isLength} = require('validator');
const {checkIsEmail} = require("./validatorMethods")

const checkSignupInputIsEmpty = (req, res, next) => {

    let errorObj = {};

    const {firstName, lastName, email, password} = req.body;

    if(!isLength(firstName, {min: 2, max: 20})) {
        errorObj.firstName = "First Name must be between 2 and 20 characters"
    }
    if(!isLength(lastName, {min: 2, max: 20} )) {
        errorObj.lastName = "Last Name must be between 2 and 20 characters"
    }
    if(!checkIsEmail(email)) {
        errorObj.email = "Email is not valid"
    }
    if(password.length === 0) {
        errorObj.password = "Password must not be Empty"
    }
    if(Object.keys(errorObj).length > 0) {
        //res.render("sign-up", {error: errorObj});
        res.status(500).json({
            message: "Error",
            data: errorObj,
        });
    } else {
        next();
    }

}

module.exports = {
    checkSignupInputIsEmpty
};