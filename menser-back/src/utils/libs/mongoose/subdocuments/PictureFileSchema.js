import mongoose from 'mongoose';

import FileSchema from './FileSchema.js';
import { PICTURE_CONFIG } from '../../../general/constants.js';

// Extending subdocument FileSchema
const PictureFileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mimeType: {
      type: String,
      required: true,
      enum: PICTURE_CONFIG.allowedMimeTypes,
    },
  },
  { timestamps: true, versionKey: false },
).add(FileSchema);

export default PictureFileSchema;
