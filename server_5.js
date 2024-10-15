require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB = require('./db/connect')
const mongoose = require('mongoose')
const authRouter =  require('./routes/auth');
const jobRouter = require('./routes/jobs');
const authentication = require('./middleware/authentication')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authentication , jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res)=>{
  res.send('jobs api');
})

// const start = async () => {
//   try {
//     connectDB()
//     app.listen(port, () =>
//       console.log(`Server is listening on port ${port}...`)
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };


// start();

connectDB()
mongoose.connection.once('open',()=>{
  console.log('is connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
