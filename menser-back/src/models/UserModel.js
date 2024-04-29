import mongoose from 'mongoose';
import { COLLECTION_NAMES } from '../utils/general/constants.js';
import { hashPassword } from '../utils/libs/brcypt.js';
import UserSessionTokenModel from './UserSessionTokenModel.js';
import PictureFileSchema from '../utils/libs/mongoose/subdocuments/PictureFileSchema.js';
import * as awsS3 from '../config/awsS3.js';
import MessageModel from './MessageModel.js';
import MessageRecipientsModel from './MessageRecipientsModel.js';

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    profilePicture: {
      type: PictureFileSchema,
      // required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true, versionKey: false },
);

UserSchema.index({ firstName: 'text', lastName: 'text', email: 'text' });

UserSchema.pre('save', async function (next) {
  // only hash the password if it has been modified or it is new
  if (this.isModified('password')) {
    this.password = await hashPassword(this.password);
  }

  next();
});

UserSchema.pre(
  'deleteOne',
  { document: true, query: false }, // More details on https://mongoosejs.com/docs/api/schema.html#schema_Schema-pre
  async function () {
    return Promise.all([
      awsS3.deleteFile(this.profilePicture.key),
      UserSessionTokenModel.deleteMany({ user: this._id }).exec(),
      MessageModel.updateMany({ sender: this._id }, { $set: { isDeleted: true } }),
      MessageRecipientsModel.updateMany({ recipient: this._id }, { $set: { isDeleted: true } }),
    ]);
  },
);

const UserModel = mongoose.model(COLLECTION_NAMES.USER, UserSchema);
export default UserModel;
