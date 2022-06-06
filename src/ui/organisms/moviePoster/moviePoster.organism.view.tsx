import React from 'react';

import * as Styled from './moviePoster.organism.styled';

type Props = {
	className?: string;
	src: string;
};
const MoviePoster: React.FC<Props> = (props) => {
	return (
		<Styled.Container className={props.className}>
			<Styled.BluredBackground src={props.src} />
			<Styled.Img src={props.src} />
		</Styled.Container>
	);
};

export { MoviePoster };
