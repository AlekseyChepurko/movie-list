import * as RD from '@devexperts/remote-data-ts';
import { array } from 'fp-ts/Array';

const sequenceArrayRD = array.sequence(RD.remoteData);

export { sequenceArrayRD };
