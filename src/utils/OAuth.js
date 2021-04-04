var OAuth = require("oauth").OAuth;

const requestURL = "https://trello.com/1/OAuthGetRequestToken";
const accessURL = "https://trello.com/1/OAuthGetAccessToken";
const authorizeURL = "https://trello.com/1/OAuthAuthorizeToken";
const appName = "rmutlPMS";
const scope = "read,write";
const expiration = "never";

// Be sure to include your key and secret in 🗝.env ↖️ over there.
// You can get your key and secret from Trello at: https://trello.com/app-key

// Trello redirects the user here after authentication
const loginCallback = `http://localhost:3000/callback`;

// You should have {"token": "tokenSecret"} pairs in a real application
// Storage should be more permanent (redis would be a good choice)
const oauth_secrets = {};

const oauth = new OAuth(
  requestURL,
  accessURL,
  key,
  secret,
  "1.0A",
  loginCallback,
  "HMAC-SHA1"
);
