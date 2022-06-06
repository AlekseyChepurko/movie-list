import React from 'react';

import { initial } from '@devexperts/remote-data-ts';
import { injectable, token } from '@injectable-ts/core';
import { Routing } from '@routes/routes';
import { useObservable } from '@utils/useObservable';

import { MovieListFeatureView } from './movieList.feature.view';
import { moviesListFeatureViewModel } from './moviesList.feature.view-model';

const movieListContainer = injectable(
	moviesListFeatureViewModel,
	token('routing')<Routing>(),
	({ list$, retry }, routing) =>
		() => {
			const list = useObservable(list$, initial);

			return React.createElement(MovieListFeatureView, { list, retry, getMoviePath: routing.movie.getPath });
		},
);

export { movieListContainer };
