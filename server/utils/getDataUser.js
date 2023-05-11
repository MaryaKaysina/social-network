export const getDataUser = (user) => {
  const { password, ...data } = user;
  return data;
}