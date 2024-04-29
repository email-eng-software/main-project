import { ForbiddenError } from '../errors/baseErrors.js';

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(', ');
const corsOptions = {
  origin: '*',
  // (origin, callback) => {
  //   if (!allowedOrigins) callback(null, true);
  //   else if (origin === undefined || allowedOrigins.indexOf(origin) !== -1) {
  //     callback(null, true);
  //   } else {
  //     callback(new ForbiddenError('Not allowed by CORS'));
  //   }
  // },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
