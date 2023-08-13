const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    promiseLibrary: global.Promise,
  })
  .then((con) => {
    console.log("Mongo db connected");
  })
  .catch((error) => {
    console.log("Error" + error.message);
  });





module.exports = mongoose;
