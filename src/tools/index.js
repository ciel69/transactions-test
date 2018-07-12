/**
 * Converting an error array to an object for redux-form
 * @param data Object
 */
export const parsErrorJoi = data => {
  const error = {};
  if (data.error && data.error.details.length > 0) {
    data.error.details.forEach(item => {
      error[item.path[0]] = item.message;
    });
  }

  return error;
};

/**
 *
 * @param banks Array
 * @param id number
 */
export const getNameBank = (banks, id) => {
  let searchBank = banks.filter(item => +item.id === +id);

  if (searchBank.length > 0) {
    return searchBank[0].name;
  }
  return '';
};
