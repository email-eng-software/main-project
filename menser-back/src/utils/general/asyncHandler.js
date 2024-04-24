export default function asyncHandler(handler) {
  // eslint-disable-next-line arrow-body-style
  return async (req, res, next) => {
    return Promise.resolve(handler(req, res, next)).catch((err) => next(err));
  };
}
