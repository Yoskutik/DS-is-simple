import { test, expect } from '@jest/globals';
import Storage from '@utils/storage';

test('Storage keys', () => {
    const keys = Object.values(Storage.Keys);
    expect(keys.length).toBe(new Set(keys).size);
});
