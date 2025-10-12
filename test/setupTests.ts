import Cache from '@/services/Cache';

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => null);
  jest.spyOn(console, 'error').mockImplementation(() => null);
  Cache.set('figuresAnimations', false);
  Cache.set('modalsAnimations', false);
});
