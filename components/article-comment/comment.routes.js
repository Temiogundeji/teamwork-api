import { Router } from 'express';
import { createArticleComment } from './comment.controller.js';
import { verifyToken } from '../../middleware/Auth.js';

const router = Router();

router.post('/articles/:articleId/comment', verifyToken, createArticleComment);

export default router;