import React from 'react';

import * as Styled from './error.organsim.styled';

type Props = {
	className?: string;
	retry?: () => void;
	errorText?: string;
};
const ErrorView: React.FC<Props> = (props) => (
	<Styled.Container>
		<Styled.Caption>Something went wrong</Styled.Caption>
		<Styled.ErrorText>{props.errorText}</Styled.ErrorText>
		<Styled.RetryButton onClick={props.retry}>Try again!</Styled.RetryButton>
	</Styled.Container>
);

export { ErrorView };
