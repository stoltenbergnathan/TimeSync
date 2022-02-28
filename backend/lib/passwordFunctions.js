const crypto = require("crypto");

const generatePassword = (password) => {
  let salt = crypto.randomBytes(32).toString("hex");
  let generatedHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: generatedHash,
  };
};

const validatePassword = (password, hash, salt) => {
  let hashToVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return hash === hashToVerify;
};

module.exports.validatePassword = validatePassword;
module.exports.generatePassword = generatePassword;
