import { media } from '@utils/styles/media';
import styled from 'styled-components';

import { MovieInfo } from '@features/movie/movie.feature.styled';

export const Container = styled.div`
	height: 100%;
	width: 100%;

	${MovieInfo} {
		width: 100vw;
		height: 100%;
		position: absolute;
		left: 0;

		${media.s`
			position: relative;
			width: 100%;
		`}
	}
`;
