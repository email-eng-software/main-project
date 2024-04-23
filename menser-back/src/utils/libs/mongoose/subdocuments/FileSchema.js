import mongoose from 'mongoose';

import * as awsS3 from '../../../../config/S3/awsS3.js';
import { S3RVER_ENDPOINT } from '../../../../config/S3/s3rver.js';
import isDevEnvironment from '../../../general/isDevEnvironment.js';

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
  if (isDevEnvironment) {
    this.url = `${S3RVER_ENDPOINT}/${
      process.env.AWS_BUCKET_NAME
    }/${encodeURIComponent(this.key)}`;
  }
  next();
});

// Delete files in S3
FileSchema.pre('remove', function () {
  return awsS3.deleteFile(this.key);
});
FileSchema.pre(
  'deleteOne',
  { document: true, query: false }, // More details on https://mongoosejs.com/docs/api/schema.html#schema_Schema-pre
  function () {
    return awsS3.deleteFile(this.key);
  }
);
FileSchema.pre('deleteMany', async function () {
  const deletedFiles = await this.model.find(this.getFilter()).exec(); // More details on https://github.com/Automattic/mongoose/issues/9152#issuecomment-714522364

  return Promise.all(deletedFiles.map((file) => awsS3.deleteFile(file.key)));
});

export default FileSchema;
