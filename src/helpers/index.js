const regexFile = (txt) => {
  const result = txt.substr(0, txt.lastIndexOf('.')) || txt;
  return result;
};

const removeSpaceName = (txt) => {
  const result = txt.replace(' ', '_');
  return result;
};

export {regexFile, removeSpaceName};
