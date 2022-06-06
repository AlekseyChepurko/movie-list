import { routes } from '@routes/routes';
import { HttpClientService } from '@services/httpClient.service';
import ReactDOM from 'react-dom/client';

import './index.css';
import { AppContainer } from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const App = AppContainer({
	restApi: new HttpClientService('https://remarkable-bombolone-51a3d9.netlify.app'),
	imageApi: new HttpClientService('https://api.themoviedb.org/3'),
	youtubeApi: new HttpClientService('https://www.googleapis.com/youtube/v3'),
	imageApiUrl: 'https://image.tmdb.org/t/p/w500/',
	routing: routes,
	youtubeEmbedApi: '//www.youtube.com/embed',
	imageApiKey: process.env.imageApiKey || '',
	youtubeApiKey: process.env.youtubeApiKey || '',
});

root.render(App);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
