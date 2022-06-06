import { movieImageCodec } from '@codecs/movieImage';
import { injectable, token } from '@injectable-ts/core';
import { DataClientService } from '@services/dataClient.service';
import { pipe } from 'fp-ts/function';

const movieImageController = injectable(
	token('imageApi')<DataClientService>(),
	token('imageApiUrl')<string>(),
	token('imageApiKey')<string>(),
	(api, imageApiUrl, apiKey) => (movie: string) =>
		[pipe(api.receiveData(`search/movie`, movieImageCodec, { api_key: apiKey, query: movie })), imageApiUrl] as const,
);

export { movieImageController };
