import { movieListCodec } from '@codecs/movieList';
import { injectable, token } from '@injectable-ts/core';
import { DataClientService } from '@services/dataClient.service';
import { pipe } from 'fp-ts/function';

const moviesListController = injectable(token('restApi')<DataClientService>(), (api) =>
	pipe(api.receiveData('.netlify/functions/movies', movieListCodec)),
);

export { moviesListController };
