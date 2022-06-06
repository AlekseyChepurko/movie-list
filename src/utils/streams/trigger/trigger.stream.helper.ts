import { BehaviorSubject, Observable } from 'rxjs';

const trigger$ = (): [Observable<never>, () => void] => {
	const trigger$ = new BehaviorSubject(null);
	const trigger = () => trigger$.next(null);
	return [trigger$.asObservable() as Observable<never>, trigger];
};

export { trigger$ };
