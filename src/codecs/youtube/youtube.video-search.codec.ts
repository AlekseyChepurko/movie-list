import { partialArray } from '@utils/io-ts/partialArray.codec';
import * as t from 'io-ts';

const videoCodec = t.type({
	id: t.type({
		videoId: t.string,
	}),
});

const searchResultsCodec = t.type({
	items: partialArray(videoCodec),
});
export { searchResultsCodec };
