import { z } from 'zod';

import objectIdSchema from '../utils/libs/zod/objectIdSchema.js';
import validate from './validate.js';
import { pictureSchema } from '../utils/libs/zod/fileSchemas.js';
import getValidatorSchema from '../utils/libs/zod/getValidatorSchema.js';

export const get = validate(
  z.object({
    query: getValidatorSchema,
  }),
);

export const getById = validate(
  z.object({
    params: z.object({
      _id: objectIdSchema('User _id'),
    }),
  }),
);

export const create = validate(
  z.object({
    body: z.object({
      firstName: z
        .string({ required_error: 'User firstName is required' })
        .min(3, 'User firstName must be atleast 3 characters')
        .max(40, 'User firstName must be a maximum of 40 characters'),
      lastName: z
        .string({ required_error: 'User lastName is required' })
        .min(3, 'User lastName must be atleast 3 characters')
        .max(40, 'User lastName must be a maximum of 40 characters'),
      email: z
        .string({ required_error: 'User email is required' })
        .email('User email must be valid'),
      password: z
        .string({ required_error: 'User password is required' })
        .min(6, 'User password must be atleast 3 characters')
        .max(16, 'User password must be a maximum of 30 characters'),
    }),
    file: pictureSchema.optional(),
  }),
);

export const update = validate(
  z.object({
    body: z.object({
      firstName: z
        .string({ required_error: 'User firstName is required' })
        .min(3, 'User firstName must be atleast 3 characters')
        .max(40, 'User firstName must be a maximum of 40 characters')
        .optional(),
      lastName: z
        .string({ required_error: 'User lastName is required' })
        .min(3, 'User lastName must be atleast 3 characters')
        .max(40, 'User lastName must be a maximum of 40 characters')
        .optional(),
      email: z
        .string({ required_error: 'User email is required' })
        .email('User email must be valid')
        .optional(),
    }),
    params: z.object({
      _id: objectIdSchema('User _id'),
    }),
    file: pictureSchema.optional(),
  }),
);

export const destroy = validate(
  z.object({
    params: z.object({
      _id: objectIdSchema('User _id'),
    }),
  }),
);
