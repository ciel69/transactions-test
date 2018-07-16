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
  // такой вариант может сработать только если id банка идут по порядку, для прода я бы оставил
  // filter или же написал функцию бинарного поиска если данных будет много тк никто не знает точно будут ли id банка просто порядковым номером элемента
  let searchBank = banks[id - 1];

  return searchBank.name;
};
