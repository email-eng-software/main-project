import mongoose from 'mongoose';
import { COLLECTION_NAMES } from '../utils/general/constants.js';
import { existingRef } from '../utils/libs/mongoose/validators.js';
import { ObjectId } from '../config/mongo.js';

const MessageRecipientsSchema = new mongoose.Schema(
  {
    recipient: {
      type: ObjectId,
      ref: COLLECTION_NAMES.USER,
      required: true,
      validate: [existingRef(COLLECTION_NAMES.USER)],
    },
    message: {
      type: ObjectId,
      ref: COLLECTION_NAMES.MESSAGE,
      required: true,
      validate: [existingRef(COLLECTION_NAMES.MESSAGE)],
    },
    isRead: {
      type: Boolean,
      required: true,
      default: false,
    },
    isFavorite: {
      type: Boolean,
      required: true,
      default: false,
    },
    isArchived: {
      type: Boolean,
      required: true,
      default: false,
    },
    // Soft delete
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

const MessageRecipientsModel = mongoose.model(
  COLLECTION_NAMES.MESSAGE_RECIPIENTS,
  MessageRecipientsSchema,
);
export default MessageRecipientsModel;
