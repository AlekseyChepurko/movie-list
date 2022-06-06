import { RemoteData } from '@devexperts/remote-data-ts';
import { LiveData } from '@utils/liveData';

export type ApiError = {
	code: number;
	description: string;
};

export type ApiResponse<V> = RemoteData<ApiError, V>;

export type ApiResponse$<V> = LiveData<ApiError, V>;
