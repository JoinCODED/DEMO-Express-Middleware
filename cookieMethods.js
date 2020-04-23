const fs = require("fs");

function generateRandomId() {
  return Math.floor(Math.random() * 10000);
}

function save(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile("cookies.json", JSON.stringify(data, null, 2), err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Gets all cookies
 * @param None
 */
function getCookies() {
  return new Promise((resolve, reject) => {
    fs.readFile("cookies.json", "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const json = JSON.parse(data);
        resolve(json);
      }
    });
  });
}

/**
 * Gets a specific cookie by ID
 * @param {number} id - Accepts the ID of the specified cookie.
 */
async function getCookie(id) {
  const cookies = await getCookies();
  return cookies.find(cookie => cookie.id == id);
}

/**
 * Creates a new cookie
 * @param {Object} newCookie - Object containing info for new cookie: the cookie name, price and image
 */
async function createCookie(newCookie) {
  const cookies = await getCookies();

  newCookie.id = generateRandomId();
  cookies.push(newCookie);
  await save(cookies);
  return newCookie;
}

/**
 * Updates a single cookie
 * @param {Object} newCookie - An object containing the changes to cookie: name, price, image (all optional)
 */
async function updateCookie(newCookie) {
  const cookies = await getCookies();
  let cookie = cookies.find(item => item.id == newCookie.id);

  cookie.name = newCookie.name;
  cookie.price = newCookie.price;
  cookie.image = newCookie.image;

  await save(cookies);
}

/**
 * Deletes a single cookie
 * @param {Object} cookie - Accepts cookie to be deleted.
 */
async function deleteCookie(cookieId) {
  let cookies = await getCookies();
  cookies = cookies.filter(item => item.id != cookieId);
  await save(cookies);
}

module.exports = {
  getCookies,
  getCookie,
  createCookie,
  updateCookie,
  deleteCookie
};
