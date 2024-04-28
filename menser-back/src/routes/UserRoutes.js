import { Router } from 'express';
import * as UserController from '../controllers/UserController.js';
import verifyJWT from '../middleware/verifyJWT.js';
import verifyOwnUser from '../middleware/verifyOwnUser.js';
import verifyAdmin from '../middleware/verifyAdmin.js';
import multerConfig from '../config/multer.js';
import { PICTURE_CONFIG } from '../utils/general/constants.js';

const UserRoutes = Router();

const processFile = multerConfig({
  access: 'public',
  allowedMimes: PICTURE_CONFIG.allowedMimeTypes,
  sizeLimitInMB: PICTURE_CONFIG.sizeLimitInMB,
});

UserRoutes.route('/')
  .get(verifyJWT, verifyAdmin, UserController.get)
  .post(processFile.single('profilePicture'), UserController.create);

UserRoutes.route('/:_id')
  .get(UserController.getById)
  .put(verifyJWT, verifyOwnUser, UserController.update)
  .delete(verifyJWT, verifyOwnUser, UserController.destroy);

export default UserRoutes;
