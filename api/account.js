import { USERS_CREATE, SESSION_CREATE } from "./endpoints";
import http from "./http";

/**
 * @param {string} email
 * @param {string} name
 * @param {string} password
 * @param {string} confirmPassword
 */

export const apiCreateAccount = async ({
  email,
  name,
  password,
  confirmPassword,
}) => {
  return await http.post(USERS_CREATE, {
    email,
    name,
    password,
    confirmPassword,
  });
};

/**
 * @param {string} email
 * @param {string} password
 */

export const apiCreateSession = async ({ email, password }) => {
  return await http.post(SESSION_CREATE, {
    email,
    password,
  });
};
