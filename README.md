### Discussion:

**Topics to discuss:**

- Middleware
  - intro to Middleware
  - Not Found Middleware
  - Error Handling Middleware

### Demo:
**intro to Middleware**
1- add a middleware in app.js
```javascript
app.use((req, res, next) => {
  console.log("I'm a middleware method");
});
```
2- try it, add next() 
3- add another one in route between list and create, just to see when will it get excuted (we see that the position of the middleware matters )
4- lets do a logger
5- in app.js add this 
```javascript
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.originalUrl}`
  );
  next();
});
```

**Not Found Middleware**
1- in app.js right before app.listen 
```javascript
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});
```
**Error Handling Middleware**
1- first add this in app right befor app.listen 
```javascript 
app.use((err, req, res, next) => {
  console.log("I'm an error handling middleware ");
});
```
2- in create cookie add next in the params of the function and in the catch add `next(error)` to call it 
3- test it by creating a cookie with no name
4- add this 
```javascript 
app.use((err, req, res, next) => {
  res.json({ message: err.message });
});
```
5- add the rest of the code 
```javascript 
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});
```

6- make sure all functions call next(error)in the catch block
7- for delete and update add the following in the else block
```javascript
const err = new Error("Cookie Not Found");
  err.status = 404;
  next(err);
```
OR 
```javascript
next({status: 404, message: "Cookie Not Found"});
```