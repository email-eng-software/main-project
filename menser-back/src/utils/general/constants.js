// Supported success response status code
export const SUCCESS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
};

// Supported error response status codes and names
export const ERROR_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER: 500,
};
export const ERROR_NAMES = {
  BAD_REQUEST: 'BadRequest',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'NotFound',
  VALIDATION_ERROR: 'ValidationError',
  INTERNAL_SERVER: 'InternalServerError',
};

// Application supported exit status
export const EXIT_STATUS = {
  SUCCESS: 0,
  FAILURE: 1,
};

// Binary data supported configuration
export const ATTACHMENT_CONFIG = {
  fileName: 'Attachment',
  allowedMimeTypes: [
    'text/plain',
    'application/pdf',
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/gif',
    'video/x-flv',
    'video/mp4',
    'video/MP2T',
    'video/3gpp',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-ms-wmv',
  ],
  sizeLimitInMB: 25,
};
export const PICTURE_CONFIG = {
  fileName: 'Picture',
  allowedMimeTypes: ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'],
  sizeLimitInMB: 5,
};

// Table names
export const COLLECTION_NAMES = {
  USER: 'users',
  USER_SESSION_TOKEN: 'usersessiontokens',
  MESSAGE: 'messages',
  MESSAGE_RECIPIENTS: 'messagerecipents',
};
