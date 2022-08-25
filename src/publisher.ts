import { Context, SDK } from ".";

export class ContextPublisher {
	publish(request: any, sdk: SDK, _: Context, requestOptions?: any): Promise<any> {
		return sdk.getClient().publish(request, requestOptions);
	}
}
