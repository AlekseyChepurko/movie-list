import React, { useMemo } from 'react';

import { initial } from '@devexperts/remote-data-ts';
import { injectable, token } from '@injectable-ts/core';
import { useObservable } from '@utils/useObservable';

import { MovieFeatureView } from './movie.feature.view';
import { movieFeatureViewModel } from './movie.feature.view-model';

const movieContainer = injectable(
	movieFeatureViewModel,
	token('youtubeEmbedApi')<string>(),
	({ getInfo$, retry }, youtubeEmbedApi) =>
		({ movie }: { movie: string }) => {
			const info$ = useMemo(() => getInfo$(movie), [movie]);
			const info = useObservable(info$, initial);

			return React.createElement(MovieFeatureView, { info, retry, youtubeEmbedApi });
		},
);

export { movieContainer };
