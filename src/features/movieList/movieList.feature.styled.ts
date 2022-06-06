import { media } from '@utils/styles/media';
import { Card as ACard, Col } from 'antd';
import styled from 'styled-components';

import { Filter as BaseFilter } from '@ui/organisms/filter';
import { MovieCard } from '@ui/organisms/movieCard';

export const CardContainer = styled(Col).attrs({
	className: 'gutter-row',
})`
	margin: 0 0 1rem 0;
`;

export const Card = styled(MovieCard)``;

export const PendingCard = styled(ACard).attrs({ title: '', description: '', loading: true })``;

export const FilterContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 0 1rem 0;
	${media.xxs`
		flex-direction: row;
		justify-content: space-between;
	`}

	${media.m`
		justify-content: start;
	`}
`;

// Needed 'cuz after using HOCs TS loses generic type parameter
export const Filter: typeof BaseFilter = styled(BaseFilter)`
	max-width: 100%;
	width: 100%;

	margin: 0 0 0.5rem 0;

	${media.xxs`
		width: 110px;
		margin: 0 .5rem 0 0;
	`}

	&:last-child {
		margin: 0;
	}
`;
