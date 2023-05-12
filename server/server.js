import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.listen(port, () => console.log(`Server has started on port: ${port}`));

app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);

