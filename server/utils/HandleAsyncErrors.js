const HandleAsyncErrors = (ErrorFunction) => (req, res, next) => {
  Promise.resolve(ErrorFunction(req, res, next)).catch(next);
};

export default HandleAsyncErrors;
