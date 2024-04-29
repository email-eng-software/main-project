import { Router } from 'express';
import * as MessageController from '../controllers/MessageController.js';
import verifyJWT from '../middleware/verifyJWT.js';
import verifyOwnUser from '../middleware/verifyOwnUser.js';
import multerConfig from '../config/multer.js';
import { ATTACHMENT_CONFIG } from '../utils/general/constants.js';

const MessageRoutes = Router();

const processFile = multerConfig({
  allowedMimes: ATTACHMENT_CONFIG.allowedMimeTypes,
  sizeLimitInMB: ATTACHMENT_CONFIG.sizeLimitInMB,
});

MessageRoutes.route('/:userId/users/:type').get(verifyJWT, verifyOwnUser, MessageController.get);

MessageRoutes.route('/:_id/:type').get(verifyJWT, MessageController.getById);

MessageRoutes.route('/').post(verifyJWT, MessageController.saveDraft);
MessageRoutes.post(
  '/:_id/attachment',
  verifyJWT,
  processFile.single('attachment'),
  MessageController.uploadAttachment,
);

MessageRoutes.put('/:_id/update-draft', verifyJWT, MessageController.updateDraft);
MessageRoutes.put('/:_id/send', verifyJWT, MessageController.send);
MessageRoutes.put('/:_id/toggle-state/:state', MessageController.toggleState);

MessageRoutes.delete('/:_id', MessageController.destroy);

export default MessageRoutes;
