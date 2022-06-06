import React from 'react';

import { Movie } from '@domain/movie';
import { Card } from 'antd';

import * as Styled from './movieCard.organism.styled';

type Props = Movie & {
	className?: string;
	width?: number;
};

const MovieCard: React.FC<Props> = (props) => {
	return (
		<Styled.Container
			style={{ width: props.width }}
			className={props.className}
			cover={<img alt={`${props.title} poster`} src={props.image} />}>
			<Card.Meta
				title={`${props.title} / ${props.releaseYear}`}
				description={
					<Styled.Description ellipsis={{ rows: 4, tooltip: props.description }}>
						{props.description}
					</Styled.Description>
				}
			/>
		</Styled.Container>
	);
};

export { MovieCard };
