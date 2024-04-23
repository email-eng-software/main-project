import mongoose from 'mongoose';

import FileSchema from './FileSchema.js';

// Extending subdocument FileSchema
const StabilityAnalysisFileSchema = (allowedMimeTypes) =>
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      mimeType: {
        type: String,
        required: true,
        enum: allowedMimeTypes,
      },
    },
    { timestamps: true, versionKey: false }
  ).add(FileSchema);

export default StabilityAnalysisFileSchema;
