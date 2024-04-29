/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';

export const existingRef = (collectionName) => ({
  validator: async (refId) =>
    mongoose.model(collectionName).findById(refId).lean().exec(),
  message: '{{PATH}} not found',
});
