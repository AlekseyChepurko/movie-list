import { partialArray } from '@utils/io-ts/partialArray.codec';
import * as t from 'io-ts';

const movieImageCodec = t.type({
	results: partialArray(t.type({ poster_path: t.string, backdrop_path: t.string })),
});

export { movieImageCodec };
