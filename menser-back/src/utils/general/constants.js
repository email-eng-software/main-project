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
export const DOCUMENTS_CONFIG = {
  fileName: 'Document',
  allowedMimeTypes: ['text/plain', 'application/pdf'],
  sizeLimitInMB: 15,
};
export const PICTURES_CONFIG = {
  fileName: 'Picture',
  allowedMimeTypes: ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'],
  sizeLimitInMB: 5,
};
export const VIDEOS_CONFIG = {
  fileName: 'Video',
  allowedMimeTypes: [
    'video/x-flv',
    'video/mp4',
    'video/MP2T',
    'video/3gpp',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-ms-wmv',
  ],
  sizeLimitInMB: 500,
};

// Table names
export const COLLECTION_NAMES = {
  USER: 'users',
  CATEGORY: 'categories',
  PRODUCT: 'products',
  COUNTOUR_MAP: 'countourmaps',
  STABILITY_ANALYSIS: 'stabilityanalysis',
  PROFILE_ANALYSIS: 'profileanalysis',
  COURSE: 'courses',
  CHAPTER: 'chapters',
  VIDEO: 'videos',
  FILE: 'files',
  USER_CERTIFICATE: 'usercertificates',
  USER_PROGRESS: 'userprogresses',
  USER_COURSE: 'usercourses',
  USER_SESSION_TOKEN: 'usersessiontokens',
  USER_PWD_TOKEN: 'userpwdtokens',
};
