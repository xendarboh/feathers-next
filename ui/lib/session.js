// Universal cookie getter/setter/remover
// Reference:
// - https://github.com/carlos-peru/next-with-api/blob/master/lib/session.js
import cookie from 'js-cookie';

export const getCookie = (key, req) =>
  process.browser ? getClientCookie(key) : getServerCookie(key, req);

export const removeCookie = (key, res) =>
  process.browser ? removeClientCookie(key) : removeServerCookie(key, res);

export const setCookie = (key, value, res) =>
  process.browser
    ? setClientCookie(key, value)
    : setServerCookie(key, value, res);

const getClientCookie = key => cookie.get(key);

const getServerCookie = (key, req) => {
  if (!req.headers.cookie) return undefined;
  const rawCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith(`${key}=`));
  return !rawCookie ? undefined : rawCookie.split('=')[1];
};

const removeClientCookie = key =>
  cookie.remove(key, {
    expires: 1,
  });

const removeServerCookie = (key, res) => res.clearCookie(key);

const setClientCookie = (key, value) =>
  cookie.set(key, value, {
    expires: 1,
    path: '/',
  });

const setServerCookie = (key, value, res) => res.cookie(key, value, {});
