import { searchResultsCodec } from '@codecs/youtube';
import { injectable, token } from '@injectable-ts/core';
import { DataClientService } from '@services/dataClient.service';

const youtubeVideoController = injectable(
	token('youtubeApi')<DataClientService>(),
	token('youtubeApiKey')<string>(),
	(api, key) => (movie: string) => api.receiveData(`search`, searchResultsCodec, { key, q: movie }),
);

export { youtubeVideoController };
