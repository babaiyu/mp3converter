const regexFile = (txt) => {
  const result = txt.substr(0, txt.lastIndexOf('.')) || txt;
  return result;
};

export {regexFile};
