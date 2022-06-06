import { movieImageController } from '@controllers/movieImage';
import { moviesListController } from '@controllers/moviesList';
import { ApiResponse$ } from '@domain/apiResonse/apiResponse.domain.types';
import { Movie } from '@domain/movie';
import { injectable } from '@injectable-ts/core';
import { liveData } from '@utils/liveData';
import { trigger$ } from '@utils/streams/trigger';
import * as A from 'fp-ts/Array';
import { flow, pipe } from 'fp-ts/function';
import { switchMap } from 'rxjs/operators';

const moviesListFeatureViewModel = injectable(moviesListController, movieImageController, (movies$, getMovieImage) => {
	const [retry$, retry] = trigger$();

	const list$: ApiResponse$<Movie[]> = pipe(
		retry$,
		switchMap(() => movies$),
		liveData.chain(
			flow(
				A.map((data) => {
					const [poster, endpoint] = getMovieImage(data.name);
					return pipe(
						poster,
						liveData.map((data) => data.results[0].backdrop_path),
						liveData.altOnError(() => ''),
						liveData.map((poster) => ({
							title: data.name,
							image: `${endpoint}${poster}`,
							genre: data.genre,
							releaseYear: data.productionYear,
							description: data.synopsisShort,
							longDescription: data.synopsis || '',
						})),
					);
				}),
				liveData.sequenceArray,
			),
		),
	);
	return {
		list$,
		retry,
	};
});
export { moviesListFeatureViewModel };
