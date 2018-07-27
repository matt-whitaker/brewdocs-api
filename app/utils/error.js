const createError = (name) => (message, data = {}) =>
  Object.assign(new Error(message), { ...data, name });

export default {
  create: createError
};
