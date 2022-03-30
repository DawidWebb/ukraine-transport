export const addCookie = (access) => {
  const data = new Date();
  const days = 1;
  data.setTime(data.getTime() + days * 1 * 30 * 60 * 1000);
  document.cookie = `${access}; path=/; max-age=${data}`;
};

export const deleteCoockie = () => {
  if (document.cookie === "keyuser") {
    document.cookie = "keyuser; path=/; max-age=-1";
  } else if (document.cookie === "user") {
    document.cookie = "user; path=/; max-age=-1";
  }
};

export const checkCookie = () => {
  if (document.cookie === "keyuser") {
    return "keyuser";
  } else if (document.cookie === "user") {
    return "user";
  } else return;
};
