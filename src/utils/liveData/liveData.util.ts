import * as RD from '@devexperts/remote-data-ts';
import { instanceObservable } from '@devexperts/rx-utils/dist/observable.utils';
import { getLiveDataM } from '@devexperts/utils/dist/adt/live-data.utils';
import { FoldableValue2 } from '@devexperts/utils/dist/typeclasses/foldable-value/foldable-value';
import {
	CoproductLeft,
	coproductMapLeft,
} from '@devexperts/utils/dist/typeclasses/product-left-coproduct-left/product-left-coproduct-left.utils';
import { sequenceArrayRD } from '@utils/RemoteData';
import * as A from 'fp-ts/Array';
import { sequenceS, sequenceT } from 'fp-ts/lib/Apply';
import { Filterable2 } from 'fp-ts/lib/Filterable';
import { MonadThrow2 } from 'fp-ts/lib/MonadThrow';
import { pipe, pipeable } from 'fp-ts/lib/pipeable';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * isomoprhic to `LiveData12<typeof instanceObservable.URI, typeof remoteData.URI, E, A>`
 * but left as an interface to not overload typechecker and IDE
 */
export interface LiveData<E, A> extends Observable<RD.RemoteData<E, A>> {}

export const URI = 'rx-utils//LiveData';
export type URI = typeof URI;
declare module 'fp-ts/lib/HKT' {
	interface URItoKind2<E, A> {
		[URI]: LiveData<E, A>;
	}
}

const foldableValueRemoteData: FoldableValue2<typeof RD.remoteData.URI> & MonadThrow2<typeof RD.remoteData.URI> = {
	...RD.remoteData,
	foldValue: (fa, onNever, onValue) => (RD.isSuccess(fa) ? onValue(fa.value) : onNever(fa)),
	throwError: RD.failure,
};

export const instanceLiveData: MonadThrow2<URI> & CoproductLeft<URI> & Filterable2<URI> = {
	URI,
	...getLiveDataM(instanceObservable, foldableValueRemoteData),
};

export const liveData = {
	...instanceLiveData,
	...pipeable(instanceLiveData),
	sequenceT: sequenceT(instanceLiveData),
	sequenceS: sequenceS(instanceLiveData),
	sequenceArray: A.array.sequence(instanceLiveData),
	combine: coproductMapLeft(instanceLiveData),
	mapLeft:
		<L, V, A>(f: (l: L) => V) =>
		(fla: LiveData<L, A>): LiveData<V, A> =>
			fla.pipe(map(RD.mapLeft(f))),
	altOnError:
		<L, A>(f: (l: L) => A) =>
		(fla: LiveData<L, A>): LiveData<L, A> =>
			fla.pipe(
				map(
					RD.fold(
						() => RD.initial,
						() => RD.pending,
						(e) => RD.success(f(e)),
						(val) => RD.success(val),
					),
				),
			),
	sequenceArrayWithoutErrors: <L, A>(flas: LiveData<L, A>[]): LiveData<L, A[]> =>
		flas.length === 0
			? liveData.of([])
			: pipe(combineLatest(flas), map(A.filter((s) => !RD.isFailure(s))), map(sequenceArrayRD)),
};
