export const addSessionItem = (language) => {
  window.sessionStorage.setItem("userLangUATrans", language);
};

export const deleteSessionItem = () => {
  window.sessionStorage.removeItem("userLangUATrans");
};

export const checkSessionItem = () => {
  return window.sessionStorage.getItem("userLangUATrans");
};
