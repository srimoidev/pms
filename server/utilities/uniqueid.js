const Hashids = require("hashids/cjs");

function encode(src, salt, length) {
  switch (length) {
    case 4:
      return new Hashids(salt, 4).encode(src);
    case 8:
      return new Hashids(salt, 8).encode(src);
    case 16:
      return new Hashids(salt, 16).encode(src);
    case 32:
      return new Hashids(salt, 32).encode(src);
    default:
      break;
  }
}
function decode(src, salt, length) {
  switch (length) {
    case 4:
      return new Hashids(salt, 4).decode(src);
    case 8:
      return new Hashids(salt, 8).decode(src);
    case 16:
      return new Hashids(salt, 16).decode(src);
    case 32:
      return new Hashids(salt, 32).decode(src);
    default:
      break;
  }
}
module.exports = {
  encode,
  decode
};
