import { nullableType } from '@utils/io-ts';
import * as t from 'io-ts';

const movieCodec = t.type({
	name: t.string,
	genre: t.string,
	image: nullableType(t.string),
	productionYear: t.number,
	synopsisShort: t.string,
	synopsis: nullableType(t.string),
});

export { movieCodec };
