beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => null);
});
