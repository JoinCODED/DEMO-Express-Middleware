### Discussion:

**Topics to discuss:**

- Middleware
  - intro to Middleware
  - Not Found Middleware
  - Error Handling Middleware

### Demo:
**intro to Middleware**
1. add a middleware in app.js
```javascript
app.use((req, res, next) => {
  console.log("I'm a middleware method");
});
```
2. try it, add next() 
3. add another one in route between list and create, just to see when will it get excuted (we see that the position of the middleware matters )
4. lets do a logger
5. in app.js add this 
```javascript
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.originalUrl}`
  );
  next();
});
```

**Not Found Middleware**
1. in app.js right before app.listen 
```javascript
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});
```
**Error Handling Middleware**
1. first add this in app right befor app.listen 
```javascript 
app.use((err, req, res, next) => {
  console.log("I'm an error handling middleware ");
});
```
2. in create cookie add next in the params of the function and in the catch add `next(error)` to call it 
3. test it by creating a cookie with no name
4. add this 
```javascript 
app.use((err, req, res, next) => {
  res.json({ message: err.message });
});
```
5. add the rest of the code 
```javascript 
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});
```

6. make sure all functions call next(error)in the catch block
7. for delete and update add the following in the else block
```javascript
const err = new Error("Cookie Not Found");
  err.status = 404;
  next(err);
```
OR 
```javascript
next({status: 404, message: "Cookie Not Found"});
```

**Fetch cookie**
1. lets stop the redundent code by adding a fetchCookie function in the contoller 
```javascript
exports.fetchCookie = async (cookieId, next) => {
  try {
    const cookie = await Cookie.findById(cookieId);
    return cookie;
  } catch (error) {
    next(error);
  }
};
```
2. in routes add the param middleware, dont forget next()
```javascript
router.param("cookieId", async (req, res, next, cookieId) => {
  const cookie = await fetchCookie(cookieId, next);
  req.cookie = cookie;
  next();
});
```

3. we can add the if here for handling the error 
   ```javascript 
   router.param("cookieId", async (req, res, next, cookieId) => {
      const cookie = await fetchCooki(cookieId, next); if (cookie) {
      req.cookie = cookie;
     next();
    } else {
     const err = new Error("Cookie Not Found");
     err.status = 404;
     next(err);
    }
   });

4. fix update cookie in the controller
   ```javascript
          exports.cookieUpdate = async (req, res, next) => {
         try {
          const cookie = await Cookie.findByIdAndUpdate(
           { _id: req.cookie.id },
          req.body,
          {
              new: true,
        runValidators: true,
          }
       );
        res.status(200).json(cookie);
       } catch (error) {
        next(error);
       }
         };
   ```
   5. fix delete cookie 
   ```javasript 
     exports.cookieDelete = async (req, res, next) => {
      try {
     await Cookie.findByIdAndRemove({ _id: req.cookie.id });

      res.status(200).json({ message: "Product deleted" });
     } catch (error) {
     next(error);
     }
      };
      ```
