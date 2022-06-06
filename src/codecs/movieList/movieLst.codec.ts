import { movieCodec } from '@codecs/movie';
import { partialArray } from '@utils/io-ts/partialArray.codec';

const movieListCodec = partialArray(movieCodec);

export { movieListCodec };
