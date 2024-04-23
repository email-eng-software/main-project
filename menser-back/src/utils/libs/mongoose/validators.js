import mongoose from 'mongoose';

// eslint-disable-next-line import/prefer-default-export
export const existingRef = (collectionName) => ({
  validator: async (refId) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    mongoose.model(collectionName).findById(refId).lean().exec(),
  message: '{{PATH}} not found',
});
