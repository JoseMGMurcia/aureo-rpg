export const getRandomGender = (): string => {
  const options = ['M', 'F', 'U'];
  return options[Math.floor(Math.random() * options.length)];
};
