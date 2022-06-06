import { movieImageController } from '@controllers/movieImage';
import { moviesListController } from '@controllers/moviesList';
import { youtubeVideoController } from '@controllers/youtubeSearchVideo';
import { ApiResponse$ } from '@domain/apiResonse/apiResponse.domain.types';
import { Movie } from '@domain/movie';
import { injectable } from '@injectable-ts/core';
import { liveData } from '@utils/liveData';
import { trigger$ } from '@utils/streams/trigger';
import * as A from 'fp-ts/Array';
import { flow, pipe } from 'fp-ts/function';
import { switchMap } from 'rxjs/operators';

const movieFeatureViewModel = injectable(
	moviesListController,
	movieImageController,
	youtubeVideoController,
	(movies$, getMovieImage, getYouTubeVideos) => {
		const [retry$, retry] = trigger$();

		const getInfo$: (movie: string) => ApiResponse$<Movie> = (movie) =>
			pipe(
				retry$,
				switchMap(() => movies$),
				liveData.chain(
					flow(
						A.findFirst(({ name }) => name === movie),
						liveData.fromOption(() => ({
							code: 404,
							description: 'We could not find such video',
						})),
					),
				),
				liveData.chain((data) => {
					const [poster, endpoint] = getMovieImage(data.name);
					return pipe(
						poster,
						liveData.map((data) => {
							return data.results[0].poster_path;
						}),
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
				liveData.chain((video) =>
					pipe(
						getYouTubeVideos(`${video.title} trailer`),
						liveData.map(({ items }) => items),
						liveData.map(A.head),
						liveData.chain(liveData.fromOption(() => ({ code: 404, description: 'No video trailer found' }))),
						liveData.map(({ id: { videoId } }) => videoId),
						liveData.altOnError((): string | undefined => undefined),
						liveData.map((id) => ({ ...video, youtubeVideoId: id })),
					),
				),
			);
		return {
			getInfo$,
			retry,
		};
	},
);
export { movieFeatureViewModel };
