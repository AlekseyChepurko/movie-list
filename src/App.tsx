import React from 'react';

import { injectable, token } from '@injectable-ts/core';
import { MainPage } from '@pages/main';
import { MoviePage } from '@pages/movie';
import { Routing } from '@routes/routes';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import 'antd/dist/antd.css';
import * as Styled from './App.styled';

import './App.css';

const AppContainer = injectable(MainPage, MoviePage, token('routing')<Routing>(), (Main, Movie, routing) => (
	<Styled.Layout className="App">
		<Router>
			<Styled.Header className="App-header">
				<Link to={routing.main.getPath()}>Application header</Link>
			</Styled.Header>
			<Styled.Main>
				<Routes>
					<Route path={routing.main.path} element={<Main />} />
					<Route path={routing.movie.path} element={<Movie />} />
				</Routes>
			</Styled.Main>
		</Router>
	</Styled.Layout>
));

export { AppContainer };
