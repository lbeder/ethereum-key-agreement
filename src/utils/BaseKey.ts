export interface IKey {
  key: Buffer;
}

export type RawKey = string | Buffer | IKey;

export class BaseKey {
  public key: Buffer;

  constructor(key: RawKey) {
    this.key = BaseKey.keyToBuf(key);
  }

  toString(): string {
    return `0x${Buffer.from(this.key).toString('hex')}`;
  }

  static keyToBuf(key: RawKey): Buffer {
    const tmp = key;
    if (typeof key === 'string') {
      let str: string = tmp as string;
      if (str.startsWith('0x')) {
        str = str.slice(2) || '0';
      }

      return Buffer.from(str, 'hex');
    }

    if (Buffer.isBuffer(key)) {
      return key;
    }

    if (key.key) {
      return key.key;
    }

    throw new Error('Invalid key type');
  }
}
