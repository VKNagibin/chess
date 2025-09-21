export const checkIsProduction = () => {
  return import.meta.env.MODE === 'production';
};

export const checkIsDevelopment = () => {
  return import.meta.env.MODE === 'development';
};
