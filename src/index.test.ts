import * as assert from 'node:assert';
import { describe, test } from 'node:test';
import { safeTry } from './index.ts';

const fixtures = {
    error: new Error('test error'),
};

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
        const [error, data] = safeTry(fixtures.error);

        assert.strictEqual(error, undefined);
        assert.strictEqual(data, fixtures.error);
    });
});

describe('safeTry with promise value', () => {
    test('should handle Error', async () => {
        const [error, data] = await safeTry(Promise.reject(fixtures.error));

        assert.strictEqual(error, fixtures.error);
        assert.strictEqual(data, undefined);
    });

    test('should handle any Error', async () => {
        const [error, data] = await safeTry(Promise.reject(fixtures.error.message));

        assert.strictEqual(error, fixtures.error.message);
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
        const [error, data] = safeTry((): number => {
            throw fixtures.error;
        })();

        assert.strictEqual(error, fixtures.error);
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
        const [error, data] = await safeTry(async (): Promise<number> => {
            throw fixtures.error;
        })();

        assert.strictEqual(error, fixtures.error);
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
