const db = require("./services/db");
const helper = require("./helper");

//validate all fields
function validateInputs(tweet) {
    const body = validateBody(tweet.body);
    if (body) {
        return body;
    }
    const email = validateEmail(tweet.email);
    if (email) {
        return email;
    }
    return false;
}

//validating input tweet
const validateBody = (tweetBody) => {
    if (tweetBody == null || tweetBody.length <= 0) {
        return "Tweet cannot be empty";
    }
    else if (tweetBody.length > 140) {
        return "Tweet cannot be greater than 140 characters";
    }
    return false;
}

//validating useremail
const validateEmail = (email) => {
    if (email == null || email.length <= 0) {
        return "Email cannot be Empty";
    }
    else if (email.length > 255) {
        return "Email cannot be greater than 255 characters";
    }
    else if (!email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
        return "Please enter a valid Email address";
    }
    return false
}

//validating id
const validateId = async (id) => {
    try {
        const idResult = await helper.runQuery(`select id from tweet where id=${id}`);
        return idResult.length;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    validateInputs,
    validateBody,
    validateEmail,
    validateId
};