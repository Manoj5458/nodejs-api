const express = require("express");
const router = express.Router();
const tweetService = require("../services/tweets");
const validateInput = require("../validate");

/* GET tweets. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await tweetService.getTweets(req.query.page));
  } catch (err) {
    console.error(`Error while getting tweets`, err.message);
    next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    res.json(await tweetService.getTweetsByName(req.params.id));
  } catch (err) {
    if (err.response == 400) {
      console.error("the required id is not found");
    }
    console.error(`Error while getting tweets by name `, err.message);
    next(err);
  }
});

/* POST tweet */
router.post("/", async function (req, res, next) {
  try {
    const validate = validateInput.validateInputs(req.body);
    console.log(validate);
    if (validate) {
      throw { statusCode: 400, message: validate };
    } else {
      res.json(await tweetService.create(req.body));
    }
  } catch (err) {
    console.error(`Error while creating tweet`, err);
    next(err);
  }
});

/* PUT tweet */
router.put("/update/:id", async function (req, res, next) {
  try {
    const id = await validateInput.validateId(req.params.id);
    if (id) {
      const body = validateInput.validateBody(req.body.body);
      if (body) {
        throw { statusCode: 400, message: body };
      } else {
        res.json(await tweetService.updateTweetBody(req.params.id, req.body));
      }
    } else {
      throw { statusCode: 400, message: "Record not found" };
    }
  } catch (err) {
    console.error(`Error while updating tweet`, err.message);
    next(err);
  }
});

/* DELETE tweet */
router.delete("/:id", async function (req, res, next) {
  try {
    const id = await validateInput.validateId(req.params.id);
    if (id) {
      res.json(await tweetService.remove(req.params.id));
    } else {
      throw { statusCode: 400, message: "Record not found" };
    }
  } catch (err) {
    console.error(`Error while deleting tweet`, err.message);
    next(err);
  }
});

module.exports = router;
