type ReturnTuple<Input, Error> = readonly [NonNullable<Error>, undefined] | readonly [undefined, Input];

type ValueReturn<Input, Error = unknown> = Input extends Promise<any>
    ? Promise<ReturnTuple<Input, Error>>
    : ReturnTuple<Input, Error>

type FunctionReturn<Input extends (...args: any[]) => unknown, Error = unknown> = (...args: Parameters<Input>) =>
    Input extends (...args: any[]) => never
        ? ReturnTuple<undefined, Error>
        : Input extends (...args: any[]) => Promise<never>
            ? Promise<ReturnTuple<undefined, Error>>
            : ValueReturn<ReturnType<Input>, Error>;

type SafeReturn<Input, Error = unknown> = Input extends (...args: any[]) => unknown
    ? FunctionReturn<Input, Error>
    : ValueReturn<Input, Error>;

type SafeTry = <Error = unknown, Input = unknown>(input: Input) => SafeReturn<Input, Error>;

export const safeTry: SafeTry = (input: Function | Promise<unknown> | unknown): any => {
    if (typeof input === 'function') {
        return (...args: unknown[]) => {
            try {
                let result = (input as Function)(...args);

                return result instanceof Promise
                    ? result.then((v) => [undefined, v]).catch((e) => [e, undefined])
                    : [undefined, result];
            } catch (e) {
                return [e, undefined];
            }
        };
    }

    if (input instanceof Promise) {
        return input.then((v) => [undefined, v]).catch((e) => {
            return [e, undefined];
        });
    }

    return [undefined, input];
};
