require("dotenv").config();
const JWT = require("jsonwebtoken");
module.exports = async (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    response.sendStatus(401);
  }

  const token = authorization.replace("Bearer", " ").trim();

  try {
    const data = await JWT.verify(token, process.env.SECRET);

    const { id } = data;

    request.id = id;

    return next();
  } catch (error) {
    response.sendStatus(401);
  }
};
