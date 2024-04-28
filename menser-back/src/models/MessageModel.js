import mongoose from 'mongoose';
import { ObjectId } from '../config/mongo.js';
import { existingRef } from '../utils/libs/mongoose/validators.js';
import { COLLECTION_NAMES } from '../utils/general/constants.js';
import AttachmentFileSchema from '../utils/libs/mongoose/subdocuments/AttachmentFileSchema.js';
// import MessageRecipientsModel from './MessageRecipientsModel.js';

export const STATUS = {
  DRAFT: 'draft',
  SENDED: 'sended',
};

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: ObjectId,
      ref: COLLECTION_NAMES.USER,
      required: true,
      validate: [existingRef(COLLECTION_NAMES.USER)],
    },
    recipientsStr: {
      type: String,
      default: null,
    },
    subject: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(STATUS),
      default: STATUS.DRAFT,
    },
    responseTo: {
      type: ObjectId,
      ref: COLLECTION_NAMES.MESSAGE,
      default: null,
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
    attachments: {
      type: [AttachmentFileSchema],
    },
    sendedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, versionKey: false },
);

// TODO: implement hard delete

// MessageSchema.pre(
//   'deleteOne',
//   { document: true, query: false }, // More details on https://mongoosejs.com/docs/api/schema.html#schema_Schema-pre
//   async function (next) {
//     const foundMessageRecipients = await MessageRecipientsModel.find({
//       message: this._id,
//     }).exec();

//     const canHardDelete = foundMessageRecipients.every(
//       (messageRecipient) => messageRecipient.isDeleted,
//     );
//     if (canHardDelete) {
//       return MessageRecipientsModel.deleteMany({ message: this._id }).exec();
//     }
//     // TODO check leaves
//     return next();
//   },
// );

const MessageModel = mongoose.model(COLLECTION_NAMES.MESSAGE, MessageSchema);
export default MessageModel;
