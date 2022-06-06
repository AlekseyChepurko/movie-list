import { ApiResponse$ } from '@domain/apiResonse';
import { Type } from 'io-ts';

/**
 * Abstract client interface.
 * No real implementation should be placed to the controllers
 * only abstract client's interface.
 * This will provide a way to easily replace exact implementation
 * */
export interface DataClientService {
	receiveData<T>(service: string, validator: Type<T>, params?: Record<string, any>): ApiResponse$<T>;
}
