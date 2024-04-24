import mongoose from 'mongoose';
import { COLLECTION_NAMES } from '../utils/general/constants.js';

const MessageSchema = new mongoose.Schema(
  {},
  { timestamps: true, versionKey: false },
);

const MessageModel = mongoose.model(COLLECTION_NAMES.MESSAGE, MessageSchema);
export default MessageModel;
