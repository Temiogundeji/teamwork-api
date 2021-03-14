import { Router } from 'express';
import { createGifComment } from './comment.controller.js';
import { verifyToken } from '../../middleware/Auth.js';

const router = Router();

router.post('/gifs/:gifId/comment', verifyToken, createGifComment);

export default router;