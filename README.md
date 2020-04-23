### Discussion:

**Topics to discuss:**

- Routes
- Controllers

(Add discussion link here)

### Demo:

**Express Routers**

To clean up our routes, we will move them all out of `app.js` into a folder that handles all of our routes. In this folder, we will create multiple **mini express applications**.

1. Let's start with creating our `routes` folder and a file for the main routes `cookies.js`.

2. To create our mini-app we will use a method from `express` called `Router()` which is a complete router system that will handle the routing on behalf of our express app. So in `cookies.js` we will require `express` and define our mini-app `router`.

```javascript
const express = require("express");
const router = express.Router();
```

3. Go back to `app.js` and cut ALL the routes and paste them in `routes/cookies` and change `app` to `router`. So, this `router` will be handling all the routes for now.

```javascript
// Retrieve cookies list
router.get("/cookies", async (req, res) => {});

// Retrieve cookie detail
router.get("/cookies/:cookieId", async (req, res) => {});

// Create a new cookie
router.post("/cookies", async (req, res) => {});

// Update an existing cookie
router.put("/cookies/:cookieId", async (req, res) => {});

// Delete an existing cookie
router.delete("/cookies/:cookieId", async (req, res) => {});
```

4. Import the `cookieMethods`.

```javascript
const cookieMethods = require("../cookieMethods");
```

5. Next, export `router`.

```javascript
module.exports = router;
```

5. Import your `router` instance in `app.js`.

```javascript
// Routes
const cookieRoutes = require("./routes/cookies");
```

6. Finally, we will call our `cookieRoutes` using the `app.use` method.

```javascript
app.use(cookieRoutes);
```

7. So what's happening now is that when a request is received, express will look inside `cookieRoutes` to look for the route with the path similar to the request's.

8. Test your routes. Tada!! All is working.

9. Can this be even more cleaned up? Yes! Since all the routes in `cookieRoutes` start with the path `/cookies` we can modify our router call.

```javascript
app.use("/cookies", cookieRoutes);
```

10. Test one of the cookies routes, it's not found! Why? The path for retrieving the list of cookies is now: `/cookies/cookies`. Why? `app.use` is adding `/cookies` to the beginning of the route! So in `routes/cookies.js`, remove `/cookies` from the paths. Now, this router will **only** be called if the request starts with `/cookies`.

```javascript
// Retrieve cookies list
router.get("/", async (req, res) => {});

// Retrieve cookie detail
router.get("/:cookieId", async (req, res) => {});

// Create a new cookie
router.post("/", async (req, res) => {});

// Update an existing cookie
router.put("/:cookieId", async (req, res) => {});

// Delete an existing cookie
router.delete("/:cookieId", async (req, res) => {});
```

**Controllers**

Our code looks much cleaner now, but our routes still look messy! Let's clean it up by adding controllers. Controllers are basically the functions that are called by the routes.

1. Create a folder called `controllers`. Inside it, create a file called `cookieController`. This file will have all the functions related to cookies.
2. Import our `cookieMethods`:

```javascript
const cookieMethods = require("../cookieMethods");
```

3. Let's start with the cookie list route. Copy the callback function from your list route and assign it to a function called `cookieList` as shown below. And to make things easier, export it directly

```javascript
exports.cookieList = async (req, res) => {
  try {
    const cookies = await cookieMethods.getCookies();
    res.json(cookies);
  } catch (error) {
    console.log("Error while fetching cookies", error);
  }
};
```

4. Now to use this controller, in `routes/cookies` require `cookieController` and pass it to the route.

```javascript
const cookieController = require("../controllers/cookieController");

// Retrieve cookies list
router.get("/", cookieController.cookieList);
```

5. Can you see how cute this looks? IKR! Let's create the other controller methods.
6. Cookie detail:

```javascript
exports.cookieDetail = async (req, res) => {
  try {
    const { cookieId } = req.params;
    const cookie = await cookieMethods.getCookie(cookieId);
    res.json(cookie);
  } catch (error) {
    console.log("Error while fetching cookie", error);
  }
};
```

```javascript
// Retrieve cookie detail
router.get("/:cookieId", cookieController.cookieDetail);
```

7. Cookie create

```javascript
exports.cookieCreate = async (req, res) => {
  try {
    const newCookie = await cookieMethods.createCookie(req.body);
    res.status(201).json(newCookie);
  } catch (error) {
    console.log("Error while creating a new cookie", error);
  }
};
```

```javascript
// Create a new cookie
router.post("/", cookieController.cookieCreate);
```

8. Cookie update

```javascript
exports.cookieUpdate = async (req, res) => {
  const { cookieId } = req.params;
  try {
    const foundCookie = await cookieMethods.getCookie(cookieId);
    let updatedCookie = { ...foundCookie, ...req.body };
    await cookieMethods.updateCookie(updatedCookie);
    res.status(204).end();
  } catch (error) {
    console.log("Error while updating a cookie!", error);
  }
};
```

```javascript
// Update an existing cookie
router.put("/:cookieId", cookieController.cookieUpdate);
```

9.  Cookie delete

```javascript
exports.cookieDelete = async (req, res) => {
  const { cookieId } = req.params;
  try {
    await cookieMethods.deleteCookie(cookieId);
    res.status(204).end();
  } catch (error) {
    console.log("Error while deleting a cookie!", error);
  }
};
```

```javascript
// Delete an existing cookie
router.delete("/:cookieId", cookieController.cookieDelete);
```
