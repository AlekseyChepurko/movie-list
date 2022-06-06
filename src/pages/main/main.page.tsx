import React from 'react';

import { injectable } from '@injectable-ts/core';

import { movieListContainer } from '@features/movieList';

const MainPage = injectable(movieListContainer, (List) => () => {
	return <List />;
});

export { MainPage };
