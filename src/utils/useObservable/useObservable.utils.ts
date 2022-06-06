import React from 'react';

import { Observable } from 'rxjs';

const useObservable = <T>(obs$: Observable<T>, initial: T) => {
	const [data, setData] = React.useState(initial);

	React.useEffect(() => {
		const subscription = obs$.subscribe(setData);

		return () => {
			subscription.unsubscribe();
		};
	}, [obs$]);

	return data;
};

export { useObservable };
