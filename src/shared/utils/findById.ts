export const findById = (id: string, list: { id: string }[]) =>
  list.find((item) => item.id === id);
