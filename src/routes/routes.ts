export const routes = {
	main: {
		path: '/',
		getPath: () => '',
	},
	movie: {
		path: 'movie/:id',
		getPath: (id: string) => {
			return `movie/${id}`;
		},
	},
} as const;

export type Routing = typeof routes;
