export const addSessionItem = (language) => {
  window.sessionStorage.setItem("userLang", language);
};

export const deleteSessionItem = () => {
  window.sessionStorage.removeItem("userLang");
};

export const checkSessionItem = () => {
  return window.sessionStorage.getItem("userLang");
};
