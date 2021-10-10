### Discussion:

**Topics to discuss:**

- Routes
- Controllers

### Demo:

**Express Routers**

To clean up our routes, we will move them all out of `app.js` into a folder that handles all of our routes. In this folder, we will create multiple **mini express applications**.

1. Let's start with creating a folder called `api`. Inside it, we will create a folder called `cookies`. Inside it, we will create a file called `routes.js`.

2. To create our mini-app we will use a method from `express` called `Router()` which is a complete router system that will handle the routing on behalf of our express app. So in `routes.js` we will require `express` and define our mini-app `router`.

   ```javascript
   const express = require("express");
   const router = express.Router();
   ```

3. Go back to `app.js` and cut ALL the routes and paste them in `cookies/routes.js` and change `app` to `router`. So, this `router` will be handling all the routes for now.

   ```javascript
   // Cookie Create
   router.post("/cookies", (req, res) => {...});

   // Cookie List
   router.get("/cookies", (req, res) => {...});

   // Cookie Detail
   router.get("/cookies/:cookieId", (req, res) => {...});

   // Cookie Delete
   router.delete("/cookies/:cookieId", (req, res) => {...});
   ```

4. Require the `cookies` dataset inside `routes/cookies.js`.

   ```javascript
   let cookies = require("../cookies");
   const slugify = require("slugify");
   ```

   _You won't need the `cookies` dataset in `app.js` anymore, remove the import there._

5. Next, export your `router`.

   ```javascript
   module.exports = router;
   ```

6. Import your `router` instance in `app.js`.

   ```javascript
   // Routes
   const cookieRoutes = require("./cookies/routes");
   ```

7. Finally, we will call our `cookieRoutes` using the `app.use()` method.

   ```javascript
   app.use(cookieRoutes);
   ```

   _Make sure to place this line below all other `app.use()` methods._

8. So what's happening now is that when a **request** is received, express will look inside `cookieRoutes` to look for the route with the path similar to the **request**'s.

9. Test your routes. Tada!! All is working.

10. Can this be even more cleaned up? Yes! Since all the routes in `cookieRoutes` start with the path `/cookies` we can modify our router call.

    ```javascript
    app.use("/cookies", cookieRoutes);
    ```

11. Test one of the cookies routes, it's not found! Why? The path for retrieving the list of cookies is now: `/cookies/cookies`. Why? `app.use` is adding `/cookies` to the beginning of the route! So in `routes/cookies.js`, remove `/cookies` from the paths. Now, this router will **only** be called if the request starts with `/cookies`.

    ```javascript
    // Cookie Create
    router.post("/", (req, res) => {...});

    // Cookie List
    router.get("/", (req, res) => {...});

    // Cookie Detail
    router.get("/:cookieId", (req, res) => {...});

    // Cookie Delete
    router.delete("/:cookieId", (req, res) => {...});
    ```

**Controllers**

Our code looks much cleaner now, but our routes still look messy! Let's clean it up by adding controllers. **Controllers are basically the functions that are called by the routes.**

1. Create a file called `controllers.js` inside `cookies`. This file will have all the functions related to cookies.

2. Require our `cookies`:

   ```javascript
   let cookies = require("../cookies");
   ```

   _You won't need the `cookies` dataset in `routes.js` anymore, remove the import there._

3. Let's start with the cookie create route. Copy the callback function from your create route and assign it to a function called `cookieCreate` as shown below. And to make things easier, export it directly

   ```javascript
   exports.cookieCreate = (req, res) => {
     cookies.push(newCookie);
     res.status(201).json(newCookie);
   };
   ```

4. Now to use this controller, in `routes.js` require all methods from `controllers.js` and pass it to the route.

   ```javascript
   const {
     cookieCreate,
     cookieList,
     cookieUpdate,
     cookieDelete,
   } = require("../controllers/cookieController");

   router.post("/", cookieCreate);
   ```

5. Can you see how cute this looks? IKR! Let's create the other controller methods.

6. Cookie list:

   ```javascript
   exports.cookieList = (req, res) => res.json(cookies);
   ```

   ```javascript
   router.get("/", cookieList);
   ```

7. Cookie detail

   ```javascript
   exports.cookieUpdate = (req, res) => {
     const { cookieId } = req.params;
     const foundCookie = .find((cookie) => cookie.id === +cookieId);
     if (foundCookie) {
       res.json(foundCookie);
     } else {
       res.status(404).json({ message: "Cookie not found" });
     }
   };
   ```

   ```javascript
   router.get("/:cookieId", cookieUpdate);
   ```

8. Cookie delete

```javascript
exports.cookieDelete = (req, res) => {
  const { cookieId } = req.params;
  const foundCookie = cookies.find((cookie) => cookie.id === +cookieId);
  if (foundCookie) {
    cookies = cookies.filter((cookie) => cookie.id !== +cookieId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Cookie not found" });
  }
};
```

```javascript
router.delete("/:cookieId", cookieDelete);
```
