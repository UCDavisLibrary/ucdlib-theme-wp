const extractStyleModifiers = (classes) => {
  const customStyles = classes.split(" ").filter(c => c.startsWith('is-style')).map(c => c.replace("is-style-", ""));
  return customStyles.join(" ");
}
export { extractStyleModifiers }