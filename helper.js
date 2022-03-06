const db = require("./services/db");

function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

const runQuery = async (query) => {
  try {
    return await db.query(query);
  } catch (e) {
    throw { message: 'Internal server error' };
  }
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

module.exports = {
  getOffset,
  emptyOrRows,
  runQuery
};
