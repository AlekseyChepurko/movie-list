import React, { useMemo, useState } from 'react';

import * as RD from '@devexperts/remote-data-ts';
import { ApiResponse } from '@domain/apiResonse/apiResponse.domain.types';
import { Movie } from '@domain/movie';
import { Card, List } from 'antd';
import * as A from 'fp-ts/Array';
import { eqNumber, eqString } from 'fp-ts/Eq';
import { identity, pipe } from 'fp-ts/function';
import { ordNumber } from 'fp-ts/Ord';
import { Link } from 'react-router-dom';

import { ErrorView } from '@ui/organisms/error/error.organism.view';

import * as Styled from './movieList.feature.styled';

const loadingCardPlaceholder = pipe(
	Array<null>(8).fill(null),
	A.mapWithIndex((i) => (
		<Styled.CardContainer key={i} className="gutter-row">
			<Styled.PendingCard key={i}>
				<Card.Meta />
			</Styled.PendingCard>
		</Styled.CardContainer>
	)),
);

const listGridProps = {
	gutter: 16,
	xs: 1,
	sm: 2,
	md: 4,
	lg: 4,
	xl: 4,
	xxl: 4,
};

type MovieListFeatureProps = {
	list: ApiResponse<Movie[]>;
	retry: () => void;
	getMoviePath: (id: string) => string;
};

export const MovieListFeatureView: React.FC<MovieListFeatureProps> = (props) => {
	const [minYearFilter, setMinYearFilter] = useState<number>();
	const [maxYearFilter, setMaxYearFilter] = useState<number>();
	const [genreFilter, setGenreFilter] = useState<string>();
	const availableYears = useMemo(
		() =>
			pipe(
				props.list,
				RD.map(A.map(({ releaseYear }) => releaseYear)),
				RD.getOrElse((): number[] => []),
				A.uniq(eqNumber),
				A.sort(ordNumber),
			),
		[props.list],
	);
	const availableGenres = useMemo(
		() =>
			pipe(
				props.list,
				RD.map(A.map(({ genre }) => genre)),
				RD.getOrElse((): string[] => []),
				A.uniq(eqString),
			),
		[props.list],
	);

	const filteringAvailable = useMemo(() => pipe(props.list, RD.isSuccess), [props.list]);

	return (
		<>
			<Styled.FilterContainer>
				<Styled.Filter
					allowClear
					disabled={!filteringAvailable}
					setValue={setMinYearFilter}
					options={availableYears.filter((year) => (maxYearFilter ? year <= maxYearFilter : true))}
					value={minYearFilter}
					placeholder={'Min. Year'}
				/>

				<Styled.Filter
					allowClear
					disabled={!filteringAvailable}
					setValue={setMaxYearFilter}
					options={availableYears.filter((year) => year >= (minYearFilter || 0))}
					value={maxYearFilter}
					placeholder={'Max. Year'}
				/>
				<Styled.Filter
					disabled={!filteringAvailable}
					allowClear
					setValue={setGenreFilter}
					options={availableGenres}
					value={genreFilter}
					placeholder={'Genre'}
				/>
			</Styled.FilterContainer>
			{pipe(
				props.list,
				RD.map(
					A.filter((movie) => {
						if (
							(genreFilter && movie.genre !== genreFilter) ||
							(maxYearFilter && movie.releaseYear > maxYearFilter) ||
							(minYearFilter && movie.releaseYear < minYearFilter)
						) {
							return false;
						}

						return true;
					}),
				),
				RD.map(
					A.map((movie) => (
						<Styled.CardContainer key={movie.title}>
							<Link to={props.getMoviePath(movie.title)}>
								<Styled.Card {...movie} />
							</Link>
						</Styled.CardContainer>
					)),
				),
				RD.fold(
					() => <></>,
					() => <List grid={listGridProps} dataSource={loadingCardPlaceholder} renderItem={identity} />,
					({ description }) => <ErrorView errorText={description} retry={props.retry} />,
					(values) => <List grid={listGridProps} dataSource={values} renderItem={identity} />,
				),
			)}
		</>
	);
};
