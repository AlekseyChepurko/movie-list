import { isLeft } from 'fp-ts/lib/Either';
import {
	appendContext,
	ArrayC,
	ArrayType,
	Errors,
	failures,
	identity,
	Mixed,
	success,
	TypeOf,
	UnknownArray,
} from 'io-ts';

function pushAll<A>(xs: Array<A>, ys: Array<A>): void {
	const l = ys.length;
	for (let i = 0; i < l; i++) {
		xs.push(ys[i]);
	}
}

/**
 * Base io-ts's array coded checks EVERY array's item to match item-codec
 * partialArray fully based on array combinator
 * @see https://github.com/gcanti/io-ts/blob/920b21ea32e82b328cd14ff4b28da72ae60db505/src/index.ts#L1271
 * except does not require EVERY item to match item's codec
 *  */
export function partialArray<C extends Mixed>(item: C, name: string = `PartialArray<${item.name}>`): ArrayC<C> {
	return new ArrayType(
		name,
		(u): u is Array<TypeOf<C>> => UnknownArray.is(u) && u.some(item.is),
		(u, c) => {
			const e = UnknownArray.validate(u, c);
			if (isLeft(e)) {
				return e;
			}
			const us = e.right;
			const len = us.length;
			let as: Array<TypeOf<C>> = us;
			const errors: Errors = [];
			for (let i = 0; i < len; i++) {
				const ui = us[i];
				const result = item.validate(ui, appendContext(c, String(i), item, ui));
				if (isLeft(result)) {
					pushAll(errors, result.left);
				} else {
					const ai = result.right;
					if (ai !== ui) {
						if (as === us) {
							as = us.slice();
						}
						as[i] = ai;
					}
				}
			}
			return as.length > 0 ? success(as) : failures(errors);
		},
		item.encode === identity ? identity : (a) => a.map(item.encode),
		item,
	);
}
