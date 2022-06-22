class Validator {
  email(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(String(email).toLowerCase());
  }
}

module.exports = new Validator();
