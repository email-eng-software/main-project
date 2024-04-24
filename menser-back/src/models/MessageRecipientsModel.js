import mongoose from 'mongoose';
import { COLLECTION_NAMES } from '../utils/general/constants.js';

const MessageRecipientsSchema = new mongoose.Schema(
  {},
  { timestamps: true, versionKey: false },
);

const MessageRecipientsModel = mongoose.model(
  COLLECTION_NAMES.MESSAGE_RECIPIENTS,
  MessageRecipientsSchema,
);
export default MessageRecipientsModel;
