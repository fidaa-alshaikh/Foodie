const EXPRESS_PORT = 4000;
const apiUrls = {
  development: `http://localhost:${EXPRESS_PORT}`,
  production:  `https://foodie-fidaa.herokuapp.com` ,
};
const API_URL =
  window.location.hostname === `localhost`
    ? apiUrls.development
    : apiUrls.production;
export default API_URL;