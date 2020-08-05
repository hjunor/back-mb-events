module.exports = function validateEmail(email) {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(String(email).toLowerCase());
}