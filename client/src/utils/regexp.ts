export const regexpWords = new RegExp('^[a-zA-Z]+(?:\\s+[a-zA-Z]+)*$');
export const regexpAddress = new RegExp('[a-zA-Z0-9_.+-]');
export const regexpNumbers = new RegExp('^[0-9]*$');
export const regexpEmail = new RegExp(
  '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'
);
