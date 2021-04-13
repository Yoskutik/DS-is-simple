import { test, expect } from '@jest/globals';
import Storage from '../src/utils/LocalStorage';

test('Storage keys', () => {
    const keys = Object.values(Storage.Keys);
    expect(keys.length).toBe(new Set(keys).size);
});
