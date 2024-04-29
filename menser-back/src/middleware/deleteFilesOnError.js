import logger from '../config/logger.js';
import * as awsS3 from '../config/awsS3.js';

const deleteFilesOnError = async (err, req, res, next) => {
  const { files, file } = req;

  try {
    // if multer .array
    if (Array.isArray(files)) {
      const keys = files?.map(({ key }) => key);

      await awsS3.deleteFiles(keys);
      return next(err);
    }

    // If multer .fields
    if (files && Object.keys(files)) {
      const filesObjs = Object.values(files).flat();
      const keys = filesObjs?.map(({ key }) => key);

      await awsS3.deleteFiles(keys);
      return next(err);
    }

    // If multer .single
    if (file) await awsS3.deleteFile(file.key);
  } catch (error) {
    logger.error(error, 'Error from the deleteFilesOnError middleware');
  }

  return next(err);
};

export default deleteFilesOnError;
