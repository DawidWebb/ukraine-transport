export const addItem = (data) => {
  const user = {
    name: data.name,
    access: data.access,
    loginId: data.loginId,
    id: data.id,
    addDate: data.addDate,
    eMail: data.eMail,
  };
  window.localStorage.setItem("user", JSON.stringify(user));
};

export const deleteItem = () => {
  window.localStorage.removeItem("user");
};

export const checkItem = () => {
  return JSON.parse(window.localStorage.getItem("user"));
};
