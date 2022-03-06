const db = require("./services/db");
const helper = require("./helper");

function validateInputs(tweet) {
    console.log("validating inputs");
    const body = validateBody(tweet.body);
    if (body) {
        return body;
    }
    const username = validateUsername(tweet.username);
    if (username) {
        return username;
    }
    const email = validateEmail(tweet.Email);
    if (email) {
        return email;
    }
    console.log("validated inputs");
    return false;
}

const validateBody = (tweetBody) => {
    console.log("validating body");
    if (tweetBody == null || tweetBody.length <= 0) {
        return "Tweet cannot be empty";
    }
    else if (tweetBody.length > 140) {
        return "Tweet cannot be greater than 140 characters";
    }
    console.log("validated body");
    return false;
}

const validateUsername = (username) => {
    console.log("validating username");
    const specialChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (username == null || username.length <= 0) {
        return "Username cannot be Empty";
    }
    else if (username.length > 50) {
        return "Username cannot be greater than 50 characters";
    }
    else if (specialChar.test(username)) {
        return "Username cannot contain special characters";
    }
    console.log("validated username");
    return false;
}

const validateEmail = (email) => {
    console.log("validating email");
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
    console.log("validated Email");
    return false
}

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
    validateUsername,
    validateEmail,
    validateId
};