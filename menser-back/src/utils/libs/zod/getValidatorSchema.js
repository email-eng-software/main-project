import { z } from 'zod';

const getValidatorSchema = z.object({
  search: z.string().optional(),
  limit: z.coerce.number().default(0),
  page: z.coerce
    .number()
    .int()
    .nonnegative()
    .default(0)
    .transform((v) => v && v - 1),
  sort: z
    .object({
      field: z.string(),
      order: z.enum(['asc', 'desc']).default('asc'),
    })
    .optional(),
});

export default getValidatorSchema;
