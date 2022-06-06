import React from 'react';

import { Movie } from '@domain/movie';
import parseHtml from 'html-react-parser';

import * as Styled from './movie.organism.styled';

type Props = Movie & {
	className?: string;
	youtubeEmbedApi: string;
};

export const MovieOrganism: React.FC<Props> = (props) => {
	return (
		<Styled.Container className={props.className}>
			<Styled.Poster src={props.image} />
			<Styled.MovieInfoContainer>
				<Styled.Title>{props.title}</Styled.Title>
				<Styled.MovieInfoRow>
					{props.releaseYear}, {props.genre}
				</Styled.MovieInfoRow>

				<Styled.Description>{parseHtml(props.longDescription)}</Styled.Description>
				{props.youtubeVideoId && (
					<Styled.PlayerContainer>
						<Styled.YoutubePlayer src={`${props.youtubeEmbedApi}/${props.youtubeVideoId}`} />
					</Styled.PlayerContainer>
				)}
			</Styled.MovieInfoContainer>
		</Styled.Container>
	);
};
