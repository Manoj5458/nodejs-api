const db = require("./db");
const helper = require("../helper");


// Get list of tweets 
async function getTweets() {
  const rows = await helper.runQuery('select * from tweet')
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

// Get list of tweets by ID
async function getTweetsById(id) {
  const rows = await helper.runQuery(`select * from tweet where id=${id}`);
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}


// Insert new tweet
async function create(tweet) {
  const result = await helper.runQuery(`INSERT INTO tweet (body, created_at, email,updated_at) VALUES ('${tweet.body}', now(), '${tweet.email}',now());`);
  let message = "Error in creating Tweets";
  if (result.affectedRows) {
    message = "Tweets created successfully";
  }
  return { message };

}

//Update Tweet 
async function updateTweetBody(id, tweets) {
  try {
    const result = await helper.runQuery(
      `UPDATE tweet 
    SET body="${tweets.body}",created_at=current_date()
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

//Delete Tweet
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
  getTweetsById,
  create,
  updateTweetBody,
  remove
};
