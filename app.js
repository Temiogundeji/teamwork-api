import express from 'express';
import bodyParser from 'body-parser';
import { cloudinaryConfig } from './helpers/cloudinaryConfig.js';
import employeeRoutes from './components/employee/employee.routes.js';
import gifRoutes from './components/gif/gif.routes.js';
import articleRoutes from './components/article/article.routes.js';
import articleCommentRoutes from './components/article-comment/comment.routes.js';
import gifCommentRoutes from './components/gif-comment/comment.router.js';

import logger from 'morgan';

const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

app.use('/api/v1', articleRoutes);
app.use('/api/v1', employeeRoutes);
app.use('/api/v1', gifRoutes);
app.use('/api/v1', articleCommentRoutes);
app.use('/api/v1', gifCommentRoutes);

app.use('*', cloudinaryConfig);

app.listen(port, () => {
   console.log(`Server is running on PORT ${port}`);
});

export default app;