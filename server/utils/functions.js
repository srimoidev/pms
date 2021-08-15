function responseByStatus(res, err, status, rows) {
  if ((status, rows)) {
    switch (status) {
      case 200:
        res.send(JSON.parse(JSON.stringify(rows)));
        break;
      case 400:
        res.send({
          status: status,
          message: "Bad Request",
          sqlMessage: err.sqlMessage,
        });
        break;
      case 404:
        res.send({
          status: status,
          message: "Not Found",
        });
        break;
      default:
        break;
    }
  } else {
    return;
  }
}

module.exports = { responseByStatus };
