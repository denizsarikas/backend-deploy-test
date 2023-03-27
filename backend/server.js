//imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const blogRoute = require('./routes/blogRoute')
const userRoutes = require('./routes/userRoute')
const commentRoutes = require('./routes/commentRoute')


//express app initialize express
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//sunucuya gelen istekleri logluyorum burada
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })

//routes
app.use('/api/blogs', blogRoute)
app.use('/api/user', userRoutes)
app.use('/api/blogs/:blogId/comments', commentRoutes)

// connect to db
mongoose.set("strictQuery", false); //[MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning. (Use `node --trace-deprecation ...` to show where the warning was created)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })