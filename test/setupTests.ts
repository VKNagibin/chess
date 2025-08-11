import Cache from '@/services/Cache';

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => null);
  Cache.set('figuresAnimations', false);
});
