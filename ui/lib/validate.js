const passwordMinLength = 6;
const resetTokenMinLength = 40;

export const validatePassword = password => {
  let err = null;
  if (password === undefined || password === null) err = 'Invalid password';
  else if (password.length < passwordMinLength)
    err = `Password must have ${passwordMinLength} or more characters`;
  return [err, err === null];
};

export const validateResetToken = token => {
  let err = null;
  if (token === undefined || token === null) err = 'Token Error';
  else if (token.length < resetTokenMinLength) err = 'Token Error';
  return [null, err === null];
};
