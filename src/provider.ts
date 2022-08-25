import { SDK } from ".";

export class ContextDataProvider {
	getContextData(sdk: SDK, requestOptions?: any): Promise<any> {
		return sdk.getClient().getContext(requestOptions);
	}
}
