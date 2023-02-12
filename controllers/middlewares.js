
const validateAccessHeader = async (req, res, next) => {
  var token = req.headers["sample-access-key"];
  if (!token || token != "sample-access-value")

    res.status(401).send({
      auth: false,
      error: false,
      message: "Access denied",
    });

  else next();
}

module.exports = {
  validateAccessHeader,
}