export interface IKey {
  key: Uint8Array;
}

export type RawKey = string | Uint8Array | IKey;

export class BaseKey {
  public key: Uint8Array;

  constructor(key: RawKey) {
    this.key = BaseKey.keyToArray(key);
  }

  public toString(): string {
    return `0x${Buffer.from(this.key).toString('hex')}`;
  }

  public static hexToUint8Array(hex: string) {
    let str = hex;
    if (str.startsWith('0x')) {
      str = str.slice(2) || '00';
    }

    if (str.length % 2 !== 0) {
      throw new RangeError('Invalid key length');
    }

    const view = new Uint8Array(str.length / 2);

    for (let i = 0; i < str.length; i += 2) {
      view[i / 2] = parseInt(str.substring(i, i + 2), 16);
    }

    return new Uint8Array(view.buffer);
  }

  private static keyToArray(key: RawKey): Uint8Array {
    if (typeof key === 'string') {
      return BaseKey.hexToUint8Array(key);
    }

    if (key instanceof Uint8Array) {
      return key;
    }

    if (key.key) {
      return key.key;
    }

    throw new Error('Invalid key type');
  }
}
