import mongoose from 'mongoose';

import FileSchema from './FileSchema.js';
import { ATTACHMENT_CONFIG } from '../../../general/constants.js';

// Extending subdocument FileSchema
const AttachmentFileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mimeType: {
      type: String,
      required: true,
      enum: ATTACHMENT_CONFIG.allowedMimeTypes,
    },
  },
  { timestamps: true, versionKey: false },
).add(FileSchema);

export default AttachmentFileSchema;
