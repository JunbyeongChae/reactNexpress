export const SET_AUTH = 'USER_AUTH/SET_AUTH'

export function setAuth(auth, googleProvider) {
  return {
      type : SET_AUTH,
      auth : auth,
      googleProvider : googleProvider
  };
}