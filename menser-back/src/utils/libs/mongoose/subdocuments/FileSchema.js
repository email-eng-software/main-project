import mongoose from 'mongoose';
import IS_DEV_ENV from '../../../general/isDevEnv.js';

const FileSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    sparse: true, // https://stackoverflow.com/questions/24524639/saving-mongoose-documents-with-empty-sub-documents-collections-results-in-duplic
  },
  url: {
    type: String,
    required: true,
  },
});

FileSchema.pre('save', function (next) {
  if (IS_DEV_ENV) {
    this.url = this.url.replace(/^(http:\/\/[^/]+\/)(.*)/, `${process.env.AWS_S3_URL}/$2`);
  }

  next();
});

export default FileSchema;
