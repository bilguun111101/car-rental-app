export const getValueFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value;
};
