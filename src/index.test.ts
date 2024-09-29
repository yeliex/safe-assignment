import * as assert from 'node:assert';
import { describe, test } from 'node:test';
import { safeTry } from './index.ts';

describe('safeTry with value', () => {
    test('should return value', () => {
        const [error, data] = safeTry(42);

        assert.strictEqual(error, undefined);
        assert.strictEqual(data, 42);
    });

    test('should return string', () => {
        const [error, data] = safeTry('test');

        assert.strictEqual(error, undefined);
        assert.strictEqual(data, 'test');
    });

    test('should return object', () => {
        const [error, data] = safeTry({ foo: 'bar' });

        assert.strictEqual(error, undefined);
        assert.deepStrictEqual(data, { foo: 'bar' });
    });

    test('should handle value as Error', () => {
        const fixture = new Error('test error');
        const [error, data] = safeTry(fixture);

        assert.strictEqual(error, undefined);
        assert.strictEqual(data, fixture);
    });
});

describe('safeTry with promise value', () => {
    test('should handle Error', async () => {
        const fixture = new Error('test error');

        const [error, data] = await safeTry(Promise.reject(fixture));

        assert.strictEqual(error, fixture);
        assert.strictEqual(data, undefined);
    });

    test('should handle Error as string', async () => {
        const fixture = 'text error message';

        const [error, data] = await safeTry(Promise.reject(fixture));

        assert.strictEqual(error, fixture);
        assert.strictEqual(data, undefined);
    });

    test('should handle Error as object', async () => {
        const fixture = { message: 'text error message' };

        const [error, data] = await safeTry(Promise.reject(fixture));

        assert.strictEqual(error, fixture);
        assert.strictEqual(data, undefined);
    });

    test('should handle Error as number', async () => {
        const fixture = 42;

        const [error, data] = await safeTry(Promise.reject(fixture));

        assert.strictEqual(error, fixture);
        assert.strictEqual(data, undefined);
    });

    test('should handle Error as boolean', async () => {
        const fixture = true;

        const [error, data] = await safeTry(Promise.reject(fixture));

        assert.strictEqual(error, fixture);
        assert.strictEqual(data, undefined);
    });

    test('should handle Error as null', async () => {
        const fixture = null;

        const [error, data] = await safeTry(Promise.reject(fixture));

        assert.strictEqual(error, fixture);
        assert.strictEqual(data, undefined);
    });

    test('should return value', async () => {
        const [error, data] = await safeTry(Promise.resolve(42));

        assert.strictEqual(error, undefined);
        assert.strictEqual(data, 42);
    });

    test('should return string', async () => {
        const [error, data] = await safeTry(Promise.resolve('test'));

        assert.strictEqual(error, undefined);
        assert.strictEqual(data, 'test');
    });

    test('should return object', async () => {
        const [error, data] = await safeTry(Promise.resolve({ foo: 'bar' }));

        assert.strictEqual(error, undefined);
        assert.deepStrictEqual(data, { foo: 'bar' });
    });
});

describe('safeTry with sync function value', () => {
    test('should handle exception', () => {
        const fixture = new Error('test error');

        const [error, data] = safeTry((): number => {
            throw fixture;
        })();

        assert.strictEqual(error, fixture);
        assert.strictEqual(data, undefined);
    });

    test('should return value', () => {
        const [error, data] = safeTry((a: number, b: number) => a + b)(1, 2);

        assert.strictEqual(error, undefined);
        assert.strictEqual(data, 3);
    });

    test('should return string', () => {
        const [error, data] = safeTry(() => 'test')();

        assert.strictEqual(error, undefined);
        assert.strictEqual(data, 'test');
    });

    test('should return object', () => {
        const [error, data] = safeTry(() => ({ foo: 'bar' }))();

        assert.strictEqual(error, undefined);
        assert.deepStrictEqual(data, { foo: 'bar' });
    });
});

describe('safeTry with async function value', () => {
    test('should handle Error', async () => {
        const fixture = new Error('test error');

        const [error, data] = await safeTry(async (): Promise<number> => {
            throw fixture;
        })();

        assert.strictEqual(error, fixture);
        assert.strictEqual(data, undefined);
    });

    test('should return value', async () => {
        const [error, data] = await safeTry(async (a: number, b: number) => a + b)(1, 2);

        assert.strictEqual(error, undefined);
        assert.strictEqual(data, 3);
    });

    test('should return string', async () => {
        const [error, data] = await safeTry(async () => 'test')();

        assert.strictEqual(error, undefined);
        assert.strictEqual(data, 'test');
    });

    test('should return object', async () => {
        const [error, data] = await safeTry(async () => ({ foo: 'bar' }))();

        assert.strictEqual(error, undefined);
        assert.deepStrictEqual(data, { foo: 'bar' });
    });
});
