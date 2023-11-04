import express, { Application } from 'express';

import postRouter from './routes/post-route';
import userRouter from './routes/user-route';

const app: Application = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/users', userRouter);
app.use('/posts', postRouter);

app.all('*', (req, res) => res.send('Not found'));

export default app;
