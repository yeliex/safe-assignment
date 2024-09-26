# safe-assignment

Error Safe Assignment alternative for JS/TS, a simple way to remove try/catch hell

## Why
The [ECMAScript Safe Assignment Operator Proposal](https://github.com/arthurfiorette/proposal-safe-assignment-operator) is to add a new operator to JavaScript that would allow for safe assignment of values, removing the need for try-catch blocks in many cases.

Since it is in a very early stage and not yet implemented in any JavaScript engine, this package provides a simple utility function that wraps a function or promise in a try-catch block, returning a tuple containing an error or undefined and the result of the function or promise.

## Installation

You can install the package using npm:

```sh
npm install safe-assignment
```

## Usage

The `safeTry` function is a utility that wraps a function or promise or any value in a try-catch block, returning a
tuple containing an error or undefined and the result of the function or promise.

### API

#### `safeTry`
A utility function that wraps a function or promise in a try-catch block.  

##### Parameters
`input (Function | Promise<unknown> | unknown)`: The function or promise to be wrapped.

##### Returns
A tuple containing an error or undefined and the result of the function or promise.

- When the input is a function, the function is executed and the result is returned.
- When the input is a promise, the promise is awaited and the result is returned.
- When the input is neither a function nor a promise, the input is returned, the error always undefined.

```typescript
import { safeTry } from 'safe-assignment';

// Synchronous function
safeTry(() => 42)(); // Output: [undefined, 42]

// Synchronous function with error
safeTry(() => {
    throw new Error('sync error');
})(); // Output: ['sync error', undefined]

// define error type generic
safeTry<Error>(Promise.reject(new Error('xxx'))) // Output: [Error, undefined]

// Asynchronous function
await safeTry(async () => 42)(); // Output: [undefined, 42]

// Asynchronous function with error
await safeTry(async () => {
    throw new Error('async error');
})(); // Output: ['async error', undefined]

// Promise
const [promiseError, promiseResult] = await safeTry(Promise.resolve(42)); // Output: [undefined, 42]

// Promise with error
const [promiseError2, promiseResult2] = await safeTry(Promise.reject(new Error('promise error'))); // Output: ['promise error', undefined]
```

## Examples

Before:
```typescript
let data: SomeType;

try {
    data = serializeQuery();
} catch (error) {
    // promise.reject or throw works well, but if want to do some thing fallback, you should catch errors
    console.error(error);
}

// anyway there should detect data, or return in cache, or use data! to avoid undefined
if (!data) {
    return;
}

let result;
try {
    result = await fetch(data);
} catch (error) {
    console.error(error);
}

return result;
```

After:
```typescript
import { safeTry } from 'safe-assignment';

const [serializeError, data] = safeTry(serializeQuery)();
if (serializeError) {
    console.error(serializeError);
    return;
}

const [fetchError, result] = await safeTry(fetch(data));
if (fetchError) {
    console.error(fetchError);
    return;
}

return result;
