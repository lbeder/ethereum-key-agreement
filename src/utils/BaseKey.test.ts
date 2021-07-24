import { expect } from 'chai';
import { BaseKey } from './BaseKey';

describe('BaseKey', () => {
  describe('construction', () => {
    [
      {
        data: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b'
      },
      Array(5),
      12345
    ].forEach((key: any) => {
      it(`should fail on invalid type of ${typeof key}`, async () => {
        expect(() => new BaseKey(key)).to.throw('Invalid key type');
      });
    });

    [
      '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
      '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
      BaseKey.hexToUint8Array('9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6'),
      BaseKey.hexToUint8Array('611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd')
    ].forEach((key) => {
      it(`should construct a base key from ${key.toString()}`, async () => {
        const baseKey = new BaseKey(key);

        expect(baseKey.key).to.be.instanceOf(Uint8Array);
        expect(baseKey.key).to.have.length.greaterThan(0);
      });
    });
  });

  describe('toString', () => {
    [
      {
        key: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        res: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6'
      },
      {
        key: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        res: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd'
      }
    ].forEach((spec) => {
      const { key, res } = spec;

      it(`should convert key ${key} to string`, async () => {
        const baseKey = new BaseKey(key);

        expect(baseKey.toString()).to.be.equal(res);
      });
    });
  });
});
