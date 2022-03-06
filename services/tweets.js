const db = require("./db");
const helper = require("../helper");



async function getTweets() {
  const rows = await helper.runQuery('select * from tweet')
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

async function getTweetsByName(id) {
  const rows = await helper.runQuery(`select * from tweet where id=${id}`);
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

async function create(tweet) {
  const result = await helper.runQuery(`INSERT INTO tweet (body, date, update_at username, userId,Email) VALUES ('${tweet.body}', now(), now(), '${tweet.username}','${tweet.userId}','${tweet.Email}');`);
  let message = "Error in creating Tweets";
  if (result.affectedRows) {
    message = "Tweets created successfully";
  }
  return { message };

}

async function updateTweetBody(id, tweets) {
  try {
    const result = await helper.runQuery(
      `UPDATE tweet 
    SET body="${tweets.body}"
    WHERE id=${id}`
    );
    let message = "Error in updating Tweets";
    if (result.affectedRows) {
      message = "Tweets updated successfully";
    }
    return { message };
  } catch (e) {
    console.log("error", e);
  }
}

async function remove(id) {
  const result = await helper.runQuery(
    `DELETE FROM tweet WHERE id=${id}`
  );

  let message = "Error in deleting Tweets";

  if (result.affectedRows) {
    message = "Tweets deleted successfully";
  }

  return { message };
}

module.exports = {
  getTweets,
  getTweetsByName,
  create,
  updateTweetBody,
  remove
};