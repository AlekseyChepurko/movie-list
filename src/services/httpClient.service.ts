import { failure, pending } from '@devexperts/remote-data-ts';
import { DataClientService } from '@services/dataClient.service';
import { liveData } from '@utils/liveData';
import * as A from 'fp-ts/Array';
import { pipe, flow } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import { Type } from 'io-ts';
import { formatValidationError } from 'io-ts-reporters';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, startWith, switchMap } from 'rxjs/operators';

const convertParams = (params: Record<string, any>): string =>
	pipe(
		params,
		Object.entries,
		A.reduce('', (acc, [key, value]) => `${acc}&${key}=${value.toString()}`),
	);

class HttpClientService implements DataClientService {
	constructor(private apiEndpoint: string) {}
	receiveData = <V, T extends Type<V>>(url: string, validator: T, params?: Record<string, string>) =>
		pipe(
			ajax.get(`${this.apiEndpoint}/${url}${params ? `?${convertParams(params)}` : ''}`),
			switchMap(
				flow(
					({ response }) => response,
					validator.decode,
					liveData.fromEither,
					liveData.mapLeft((es) => ({
						code: 500,
						description: pipe(
							es[0],
							formatValidationError,
							O.getOrElse(() => 'Unknown error'),
						),
					})),
				),
			),
			catchError((e) => of(failure({ code: e.status || e.statusCode || 501, description: e.toString() }))),
			startWith(pending),
		);
}

export { HttpClientService };
