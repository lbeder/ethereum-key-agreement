import chai from 'chai';
import dirtyChai from 'dirty-chai';
import { isHex, isNumber, isPresent, isPrivateKey, isPublicKey, isValidSignature } from './Validators';

chai.use(dirtyChai);
const { expect } = chai;

describe('isPresent', () => {
  ['12345', 'sdfsfdsfdsfdsf', '100000', '      a'].forEach((str: string) => {
    it(`should validate "${str}"`, async () => {
      expect(isPresent(str)).to.be.undefined();
    });
  });

  ['', '  ', '       '].forEach((str: string) => {
    it(`should return invalid element on "${str}"`, async () => {
      expect(isPresent(str)).to.be.deep.equal(<div className="invalid-feedback">Can't be blank</div>);
    });
  });
});

describe('isNumber', () => {
  ['12345', '0', '1.1', '100000', '-50.5'].forEach((num: string) => {
    it(`should validate ${num}`, async () => {
      expect(isNumber(num)).to.be.undefined();
    });
  });

  ['', '123a', 'abcd', 'dsfsdfsdfdsf', '100$', '***   12', '   1000'].forEach((num: string) => {
    it(`should return invalid element on ${num}`, async () => {
      expect(isNumber(num)).to.be.deep.equal(<div className="invalid-feedback">Not a valid number</div>);
    });
  });
});

describe('isHex', () => {
  ['12345', '0', '0x12345', '0x0', 'ffff', 'FFFF', '0xFFFF'].forEach((num: string) => {
    it(`should validate ${num}`, async () => {
      expect(isHex(num)).to.be.undefined();
    });
  });

  ['', '123G', 'dsfsdfsdfdsf', '100$', '***   0x12', '   0x1000'].forEach((num: string) => {
    it(`should return invalid element on ${num}`, async () => {
      expect(isHex(num)).to.be.deep.equal(<div className="invalid-feedback">Not a valid hexadecimal data</div>);
    });
  });
});

describe('isPrivateKey', () => {
  [
    '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
    '42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
    '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
    '9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
    '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
    '611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd'
  ].forEach((key: string) => {
    it(`should validate ${key}`, async () => {
      expect(isPrivateKey(key)).to.be.undefined();
    });
  });

  [
    '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e',
    '42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e',
    '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7baa',
    '42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7baa',
    '',
    '123a',
    'abcd',
    'dsfsdfsdfdsf',
    '100$',
    '***   12',
    '   1000'
  ].forEach((key: string) => {
    it(`should return invalid element on ${key}`, async () => {
      expect(isPrivateKey(key)).to.be.deep.equal(<div className="invalid-feedback">Not a valid private key</div>);
    });
  });
});

describe('isPublicKey', () => {
  [
    '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
    '0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
    '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
    '0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
    '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
    '03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868'
  ].forEach((key: string) => {
    it(`should validate ${key}`, async () => {
      expect(isPublicKey(key)).to.be.undefined();
    });
  });

  [
    '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb',
    '0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb',
    '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37aa',
    '0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37aa',
    '0x04ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
    '04ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
    '0xec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad28688f34ed6feb3a6402abf27f31ddac0e2ee9ce7506c04583d17ab1ff116d358a',
    'ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad28688f34ed6feb3a6402abf27f31ddac0e2ee9ce7506c04583d17ab1ff116d358a',
    '0xec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad28688f34ed6feb3a6402abf27f31ddac0e2ee9ce7506c04583d17ab1ff116d358ad7aa',
    'ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad28688f34ed6feb3a6402abf27f31ddac0e2ee9ce7506c04583d17ab1ff116d358ad7aa',
    '',
    '123a',
    'abcd',
    'dsfsdfsdfdsf',
    '100$',
    '***   12',
    '   1000'
  ].forEach((key: string) => {
    it(`should return invalid element on ${key}`, async () => {
      expect(isPublicKey(key)).to.be.deep.equal(<div className="invalid-feedback">Not a valid public key</div>);
    });
  });
});

describe('isValidSignature', () => {
  [
    '0xd53e1beb5d33520725d03a7067cbb937cf7d7ee3a8d15d76b66e7fae4b60c0f35a3106466982de23e8a7f0da496acb144a1d2f19c780f60a1051c4d0042c3f581c',
    'd53e1beb5d33520725d03a7067cbb937cf7d7ee3a8d15d76b66e7fae4b60c0f35a3106466982de23e8a7f0da496acb144a1d2f19c780f60a1051c4d0042c3f581c',
    '0xa01eb0464fdf7a322de55951fb8e3caad5d5c7dac4610ef80c71f2acc25a6df95770fadf72cb287c6030ef6ef9358ee2afa42b1298f848ac4428c68a8cfec1441c',
    'a01eb0464fdf7a322de55951fb8e3caad5d5c7dac4610ef80c71f2acc25a6df95770fadf72cb287c6030ef6ef9358ee2afa42b1298f848ac4428c68a8cfec1441c',
    '0x8b9a004a6e1c29d6a956b8034f06687b3777e5fe4224ea49f73d8e2a5262ff105f2b5ea3575399c9166cf0028d6f28fb1b0866f5e368ee2261c0158aad15aa8f1c',
    '8b9a004a6e1c29d6a956b8034f06687b3777e5fe4224ea49f73d8e2a5262ff105f2b5ea3575399c9166cf0028d6f28fb1b0866f5e368ee2261c0158aad15aa8f1c'
  ].forEach((sig: string) => {
    it(`should validate ${sig}`, async () => {
      expect(isValidSignature(sig)).to.be.undefined();
    });
  });

  [
    '0x8b9a004a6e1c29d6a956b8034f06687b3777e5fe4224ea49f73d8e2a5262ff105f2b5ea3575399c9166cf0028d6f28fb1b0866f5e368ee2261c0158aad15aa',
    '8b9a004a6e1c29d6a956b8034f06687b3777e5fe4224ea49f73d8e2a5262ff105f2b5ea3575399c9166cf0028d6f28fb1b0866f5e368ee2261c0158aad15aa',
    '0xd53e1beb5d33520725d03a7067cbb937cf7d7ee3a8d15d76b66e7fae4b60c0f35a3106466982de23e8a7f0da496acb144a1d2f19c780f60a1051c4d0042c3f',
    'd53e1beb5d33520725d03a7067cbb937cf7d7ee3a8d15d76b66e7fae4b60c0f35a3106466982de23e8a7f0da496acb144a1d2f19c780f60a1051c4d0042c3f',
    '',
    '123a',
    'abcd',
    'dsfsdfsdfdsf',
    '100$',
    '***   12',
    '   1000'
  ].forEach((sig: string) => {
    it(`should return invalid element on ${sig}`, async () => {
      expect(isValidSignature(sig)).to.be.deep.equal(<div className="invalid-feedback">Not a valid signature</div>);
    });
  });
});
