function handleErrors(error, request, response, next) {
  // eslint-disable-next-line no-console
  console.log(error);
  response.status(500).json({ error: 'Internal server error' });
}

module.exports = handleErrors;
