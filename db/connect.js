const mongoose = require('mongoose')
require('dotenv')
const connectDB = async () => {
  await mongoose.connect(process.env.DATABASE_URL, {
});
}

module.exports = connectDB  