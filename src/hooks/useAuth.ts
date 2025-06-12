export const useAuth = () => {
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  const handleLogout = () => localStorage.removeItem('token');

  return {
    isAuthenticated,
    handleLogout,
  };
};
