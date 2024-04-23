/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import { z } from 'zod';

import { ATTACHMENT_CONFIG, PICTURE_CONFIG } from '../../general/constants.js';
import numToMegaBytes from '../../general/numToMegaBytes.js';

// Schema to validate the object that comes from multer lib
const schema = ({ fileName, allowedMimeTypes, sizeLimitInMB }) =>
  z
    .object({
      originalname: z.string({
        required_error: `${fileName} original name is required`,
      }),
      key: z.string({
        required_error: `${fileName} key is required`,
      }),
      size: z
        .number({ required_error: `${fileName} size is required` })
        .lte(
          numToMegaBytes(sizeLimitInMB),
          `${fileName} cannot be bigger than ${sizeLimitInMB} MB`,
        ),
      mimetype: z.enum(allowedMimeTypes, {
        errorMap: () => ({
          message: `Invalid ${fileName} mime type. Only allowed: ${allowedMimeTypes.join(
            ', ',
          )}`,
        }),
      }),
    })
    .transform(
      ({ originalname: name, mimetype: mimeType, location: url, ...rest }) => ({
        name,
        mimeType,
        url,
        ...rest,
      }),
    );

export const attachmentSchema = schema(ATTACHMENT_CONFIG).transform(
  ({ size, ...document }) => document,
);
export const pictureSchema = schema(PICTURE_CONFIG).transform(
  ({ size, ...picture }) => picture,
);
