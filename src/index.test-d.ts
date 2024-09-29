import { expectType } from 'tsd';
import { safeTry } from './index.ts';

{
    const [error, data] = safeTry((): number => {
        throw new Error('test error');
    })();

    if (!error) {
        console.log(data);
    }

    expectType<unknown | undefined>(error);
    expectType<number | undefined>(data);

    // simple assertion
    error && expectType<unknown>(error) && expectType<undefined>(data);
    data && expectType<number>(data) && expectType<undefined>(error);

    // error or data is undefined
    if (typeof error !== 'undefined') {
        expectType<unknown>(error);
        expectType<undefined>(data);
    } else {
        expectType<undefined>(error);
        expectType<number>(data);
    }

    // if narrow data first
    if (error) {
        expectType<unknown>(error);
        expectType<undefined>(data);
    }

    if(data) {
        expectType<number>(data);
        expectType<undefined>(error);
    }
}

// todo: add function only throw exception
