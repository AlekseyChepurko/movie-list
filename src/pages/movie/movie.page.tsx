import React from 'react';

import { injectable, token } from '@injectable-ts/core';
import { Routing } from '@routes/routes';
import { Navigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { movieContainer } from '@features/movie';

import * as Styled from './movie.page.styled';

const MoviePage = injectable(movieContainer, token('routing')<Routing>(), (Movie, routes) => () => {
	const { id } = useParams();
	const location = useLocation();
	if (!id) {
		return <Navigate to={routes.main.getPath()} state={{ from: location }} replace />;
	}
	return (
		<Styled.Container>
			<Movie movie={id} />
		</Styled.Container>
	);
});

export { MoviePage };
