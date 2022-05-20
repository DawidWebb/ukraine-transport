export const addItem = (data) => {
  const user = {
    name: data.name,
    loginId: data.loginId,
    id: data.id,
    addDate: data.addDate,
    eMail: data.eMail,
  };
  window.localStorage.setItem("userUaTransport", JSON.stringify(user));
};

export const deleteItem = () => {
  window.localStorage.removeItem("userUaTransport");
};

export const checkItem = () => {
  return JSON.parse(window.localStorage.getItem("userUaTransport"));
};
