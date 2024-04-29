import mongoose from 'mongoose';

import { ObjectId } from '../config/mongo.js';
import { COLLECTION_NAMES } from '../utils/general/constants.js';
import { existingRef } from '../utils/libs/mongoose/validators.js';

const UserTokenSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: COLLECTION_NAMES.USER,
      required: true,
      validate: [existingRef(COLLECTION_NAMES.USER)],
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      expires: 0,
    },
  },
  { versionKey: false },
);

UserTokenSchema.pre(/^find/, function (next) {
  this.populate({ path: 'user' });
  next();
});

const UserSessionTokenModel = mongoose.model(
  COLLECTION_NAMES.USER_SESSION_TOKEN,
  UserTokenSchema,
);
export default UserSessionTokenModel;
