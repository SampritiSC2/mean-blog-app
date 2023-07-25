const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const connectDB = require('./db/mongoose');
const categoryRouter = require('./routers/categoryRouter');
const postRouter = require('./routers/postRouter');
const authRouter = require('./routers/authRouter');
const commentRouter = require('./routers/commentRouter');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/comment', commentRouter);

const PORT = process.env.PORT || 8001;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is up and running on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
