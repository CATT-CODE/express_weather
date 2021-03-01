const {isAlpha} = require("validator")

function checkSignupDataType(req, res, next) {
    let errorObj = {};

    const {firstName, lastName} = req.body;
    
    if(!isAlpha(firstName)) {
        errorObj.firstName = "First Name can only contain letters"
    }
    if(!isAlpha(lastName)) {
        errorObj.lastName = "Last Name can only contain letters"
    }
    if(Object.keys(errorObj).length > 0) {
        res.status(500).json({
            message: "Error",
            data: errorObj,
        });
    } else {
        next();
    }

};

module.exports = {
    checkSignupDataType
};