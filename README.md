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
// Cookie Create
router.post("/cookies", (req, res) => {});

// Cookie List
router.get("/cookies", (req, res) => {});

// Cookie Detail
router.get("/cookies/:cookieId", (req, res) => {});

// Cookie Update
router.put("/cookies/:cookieId", (req, res) => {});

// Cookie Delete
router.delete("/cookies/:cookieId", (req, res) => {});
```

4. Import the `cookies`.

```javascript
let cookies = require("../cookies");
```

5. Next, export your `router`.

```javascript
module.exports = router;
```

6. Import your `router` instance in `app.js`.

```javascript
// Routes
const cookieRoutes = require("./routes/cookies");
```

7. Finally, we will call our `cookieRoutes` using the `app.use` method.

```javascript
app.use(cookieRoutes);
```

8. So what's happening now is that when a request is received, express will look inside `cookieRoutes` to look for the route with the path similar to the request's.

9. Test your routes. Tada!! All is working.

10. Can this be even more cleaned up? Yes! Since all the routes in `cookieRoutes` start with the path `/cookies` we can modify our router call.

```javascript
app.use("/cookies", cookieRoutes);
```

11. Test one of the cookies routes, it's not found! Why? The path for retrieving the list of cookies is now: `/cookies/cookies`. Why? `app.use` is adding `/cookies` to the beginning of the route! So in `routes/cookies.js`, remove `/cookies` from the paths. Now, this router will **only** be called if the request starts with `/cookies`.

```javascript
// Cookie Create
router.post("/", (req, res) => {});

// Cookie List
router.get("/", (req, res) => {});

// Cookie Detail
router.get("/:cookieId", (req, res) => {});

// Cookie Update
router.put("/:cookieId", (req, res) => {});

// Cookie Delete
router.delete("/:cookieId", (req, res) => {});
```

**Controllers**

Our code looks much cleaner now, but our routes still look messy! Let's clean it up by adding controllers. Controllers are basically the functions that are called by the routes.

1. Create a folder called `controllers`. Inside it, create a file called `cookieController`. This file will have all the functions related to cookies.
2. Import our `cookies`:

```javascript
const cookies = require("../cookies");
```

3. Let's start with the cookie create route. Copy the callback function from your list route and assign it to a function called `cookieCreate` as shown below. And to make things easier, export it directly

```javascript
exports.cookieCreate = (req, res) => {
  const id = cookies[cookies.length - 1].id + 1;
  const newCookie = { id, ...req.body }; //id is equivalent to id: id
  cookies.push(newCookie);
  res.status(201).json(newCookie);
};
```

4. Now to use this controller, in `routes/cookies` require all methods from `cookieController` and pass it to the route.

```javascript
const {
  cookieCreate,
  cookieList,
  cookieDetail,
  cookieUpdate,
  cookieDelete
} = require("../controllers/cookieController");

// Cookie Create
router.post("/", cookieCreate);
```

5. Can you see how cute this looks? IKR! Let's create the other controller methods.

6. Cookie list:

```javascript
exports.cookieList = (req, res) => res.json(cookies);
```

```javascript
// Cookie List
router.get("/", cookieList);
```

7. Cookie detail

```javascript
exports.cookieDetail = (req, res) => {
  const { cookieId } = req.params;
  const foundCookie = cookies.find(cookie => cookie.id === +cookieId);
  if (foundCookie) {
    res.json(foundCookie);
  } else {
    res.status(404).json({ message: "Cookie not found" });
  }
};
```

```javascript
// Cookie Detail
router.get("/:cookieId", cookieDetail);
```

8. Cookie update

```javascript
exports.cookieUpdate = (req, res) => {
  const { cookieId } = req.params;
  const foundCookie = cookies.find(cookie => cookie.id === +cookieId);
  if (foundCookie) {
    for (const key in req.body) foundCookie[key] = req.body[key];
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Cookie not found" });
  }
};
```

```javascript
// Cookie Update
router.put("/:cookieId", cookieUpdate);
```

9.  Cookie delete

```javascript
exports.cookieDelete = (req, res) => {
  const { cookieId } = req.params;
  const foundCookie = cookies.find(cookie => cookie.id === +cookieId);
  if (foundCookie) {
    cookies = cookies.filter(cookie => cookie.id !== +cookieId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Cookie not found" });
  }
};
```

```javascript
// Cookie Delete
router.delete("/:cookieId", cookieDelete);
```
