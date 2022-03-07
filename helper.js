const db = require("./services/db");

// Running db queries
const runQuery = async (query) => {
  try {
    return await db.query(query);
  } catch (e) {
    throw { message: 'Internal server error' };
  }
}

//check record 
function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

module.exports = {
  emptyOrRows,
  runQuery
};
