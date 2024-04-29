import { z } from 'zod';

import objectIdSchema from '../utils/libs/zod/objectIdSchema.js';
import { attachmentSchema } from '../utils/libs/zod/fileSchemas.js';
import validate from './validate.js';

const attachmentFileSchema = z.object({
  name: z.string(),
  mimeType: z.string(),
  url: z.string(),
  key: z.string(),
});

export const get = validate(
  z.object({
    query: z.object({
      search: z.string().optional(),
      limit: z.coerce.number().default(0),
      page: z.coerce
        .number()
        .int()
        .nonnegative()
        .default(0)
        .transform((v) => v && v - 1),
    }),
    params: z.object({
      type: z.enum(['sended', 'received', 'draft', 'archived']),
      userId: objectIdSchema('userId'),
    }),
  }),
);

export const getById = validate(
  z.object({
    params: z.object({
      _id: objectIdSchema('_id'),
      type: z.enum(['draft', 'archived', 'parent']),
    }),
  }),
);

export const saveDraft = validate(
  z.object({
    body: z.object({
      sender: objectIdSchema('Message sender'),
      responseTo: objectIdSchema('Message responseTo').optional(),
    }),
  }),
);

export const uploadAttachment = validate(
  z.object({
    file: attachmentSchema,
    params: z.object({
      _id: objectIdSchema('Message _id'),
    }),
  }),
);

export const send = validate(
  z.object({
    body: z.object({
      recipientsStr: z.string({ required_error: 'Message recipients is required' }),
      subject: z.string({ required_error: 'Message subject is required' }),
      content: z.string({ required_error: 'Message content is required' }),
      attachments: z.array(attachmentFileSchema).optional(),
    }),
    params: z.object({
      _id: objectIdSchema('Message _id'),
    }),
  }),
);

export const updateDraft = validate(
  z.object({
    body: z.object({
      recipientsStr: z.string().optional(),
      subject: z.string().optional(),
      content: z.string().optional(),
      attachments: z.array(attachmentFileSchema).optional(),
    }),
    params: z.object({
      _id: objectIdSchema('Message _id'),
    }),
  }),
);

export const toggleState = validate(
  z.object({
    params: z.object({
      _id: objectIdSchema('Message _id'),
      state: z.enum(['read', 'favorite', 'archive']),
    }),
    query: z.object({ userId: objectIdSchema('userId').optional() }),
  }),
);

export const destroy = validate(
  z.object({
    params: z.object({
      _id: objectIdSchema('Message _id'),
    }),
  }),
);
