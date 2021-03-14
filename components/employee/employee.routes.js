import { Router } from 'express';
import { login, registerEmployee } from './employee.controller.js';
import multer from 'multer';
import { imageStorage } from '../../helpers/multerCloudinary.js';

const parser = multer({ storage: imageStorage });
const parserConst = parser.single('image');

const router = Router();

router.post('/auth/create-user', parserConst, registerEmployee);
router.post('/auth/signin', login);

export default router;