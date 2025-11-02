export const checkAuth = () => {
  window.dispatchEvent(new Event('localstorage-updated'));
};