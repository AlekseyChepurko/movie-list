import React from 'react';

import * as RD from '@devexperts/remote-data-ts';
import { ApiResponse } from '@domain/apiResonse/apiResponse.domain.types';
import { Movie } from '@domain/movie';
import { pipe } from 'fp-ts/function';

import { Loading } from '@ui/atoms/loading';
import { ErrorView } from '@ui/organisms/error/error.organism.view';

import * as Styled from './movie.feature.styled';

type MovieFeatureProps = {
	info: ApiResponse<Movie>;
	retry: () => void;
	youtubeEmbedApi: string;
};

export const MovieFeatureView: React.FC<MovieFeatureProps> = (props) => {
	return pipe(
		props.info,
		RD.fold(
			() => <></>,
			() => <Loading />,
			({ description }) => <ErrorView retry={props.retry} errorText={description} />,
			(movie) => <Styled.MovieInfo youtubeEmbedApi={props.youtubeEmbedApi} {...movie} />,
		),
	);
};
