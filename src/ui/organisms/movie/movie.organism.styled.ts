import { media } from '@utils/styles/media';
import { Typography } from 'antd';
import styled from 'styled-components';

import { MoviePoster } from '@ui/organisms/moviePoster';
import { BluredBackground, Img as PosterImage } from '@ui/organisms/moviePoster/moviePoster.organism.styled';

export const Container = styled.div`
	${media.s`
		display: flex;
	`}
`;

export const Poster = styled(MoviePoster)`
	height: 220px;

	${media.s`
		display: flex;
		align-self: baseline;
		align-items: center;
		min-height: 330px;
		height: auto;
		min-width: 25%;
		padding: 1rem;
		
		${BluredBackground} {
			height: 100%;
			width: 100%;
			top: 0;
			left: 0;
		}
		
		${PosterImage} {
			height: 100%;
			width: 100%;
		}
	`}
`;

export const MovieInfoContainer = styled.div`
	border-radius: 1rem 1rem 0 0;
	background: white;
	margin-top: -1rem;
	position: relative;
	padding: 1rem;

	${media.s`
		background: none;
		padding: 0 1rem;
	`}
`;

export const Title = styled(Typography.Title).attrs({ level: 2 })``;

export const MovieInfoRow = styled(Typography.Paragraph)``;

export const Description = styled(Typography.Paragraph).attrs({
	ellipsis: { rows: 10, expandable: true, mark: true },
})`
	text-align: left;
`;

export const PlayerContainer = styled.div`
	position: relative;
	overflow: hidden;
	height: 0;
	padding-top: 56.25%;
`;

export const YoutubePlayer = styled.iframe.attrs({ allowFullScreen: true })`
	border: none;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
`;
