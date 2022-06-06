import * as t from 'io-ts';

const nullableType = <T extends t.Type<any>>(type: T) => t.union([t.nullType, type]);

export { nullableType };
