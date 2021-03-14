import express from 'express';
import { cloudinaryConfig } from './helpers/cloudinaryConfig';
import employeeRoutes from './components/employee/employee.routes';
import gifRoutes from './components/gif/gif.routes';
import articleRoutes from './components/article/article.routes';
import articleCommentRoutes from './components/article-comment/comment.routes';
import gifCommentRoutes from './components/gif-comment/comment.router';

const cors = require('cors');
import logger from 'morgan';

const app = express();

app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));

app.use(cors());

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