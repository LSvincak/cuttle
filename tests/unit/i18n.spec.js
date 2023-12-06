import { describe, expect, it} from 'vitest';
import i18n from '../../src/i18n.js';

describe('i18n', () => {
  
  it('should correctly set the locale', () => {
    expect(i18n.global.locale.value).toBe('en');
  });

  it('should correctly set the fallback locale', () => {
    expect(i18n.global.fallbackLocale.value).toBe('en');
  });
});