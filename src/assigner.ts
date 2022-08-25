import { chooseVariant, stringToUint8Array } from "./utils";
import { murmur3_32 } from "./murmur3_32";

export class VariantAssigner {
	_unitHash: number;
	constructor(unit: string) {
		this._unitHash = murmur3_32(stringToUint8Array(unit).buffer);
	}

	assign(split: number | number[], seedHi: number | number[], seedLo: number | number[]) {
		const prob = this._probability(seedHi, seedLo);
		return chooseVariant(split, prob);
	}

	_probability(seedHi: number | number[], seedLo: number | number[]) {
		const key = this._unitHash;
		const buffer = new ArrayBuffer(12);
		const view = new DataView(buffer);
		view.setUint32(0, typeof seedLo === "number" ? seedLo : parseInt(seedLo.join()), true);
		view.setUint32(4, typeof seedHi === "number" ? seedHi : parseInt(seedHi.join()), true);
		view.setUint32(8, key, true);

		return murmur3_32(buffer) * (1.0 / 0xffffffff);
	}
}
