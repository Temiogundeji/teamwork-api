import { Router } from 'express';
import { createGif, deleteAGif, getAllGifs } from '../gif/gif.controller.js';
import { verifyToken } from '../../middleware/Auth.js';
import multer from 'multer';
import { gifStorage } from '../../helpers/multerCloudinary.js';

const parser = multer({ storage: gifStorage });
const parserConst = parser.single('gifImage');

const router = Router();

router
.post('/gifs', verifyToken, parserConst, createGif)
.get('/gifs', verifyToken, getAllGifs)
.delete('/gifs/:gifId', verifyToken, deleteAGif);

export default router;