// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getFromLocalStorage = (key: string): any | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
};

export const getToken = () => localStorage.getItem('token');

export const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};
