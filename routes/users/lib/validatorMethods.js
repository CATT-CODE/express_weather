const {isEmpty, isEmail} = require("validator");


function checkIsEmpty(target) {
    if (isEmpty(target)) {
        return true;
    } else {
        return false;
    }
}

function checkIsEmail(target) {
    if (isEmail(target)) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    checkIsEmpty,
    checkIsEmail,
};