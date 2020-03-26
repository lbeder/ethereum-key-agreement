import { PrivateKey } from './PrivateKey';
import { ECDH } from './ECDH';

describe('ECDH', () => {
  describe('derivePublicKey', () => {
    [
      {
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        privateKey: '0x2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34',
        res: '0x03b69287fe2302619585d03ef4d94b3f839b7efd96f559b04f3eecff49460d6b0d'
      },
      {
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        privateKey: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        res: '0x03b69287fe2302619585d03ef4d94b3f839b7efd96f559b04f3eecff49460d6b0d'
      },
      {
        publicKey: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
        privateKey: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        res: '0x039323a8f939950630015c8843920ad09f70ba465727c7704810018f1c6eeb66eb'
      },
      {
        publicKey: '0x02d4d126793b4e653aa7fc4c9e40148d61dbe707085c3cf71fe4702ed36f999c26',
        privateKey: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        res: '0x039323a8f939950630015c8843920ad09f70ba465727c7704810018f1c6eeb66eb'
      },
      {
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        privateKey: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        res: '0x03045320086faaadd6fd77ca31a6c9bcec89cc3ca3b8e4f2d542a4592e0a889197'
      },
      {
        publicKey: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
        privateKey: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        res: '0x03045320086faaadd6fd77ca31a6c9bcec89cc3ca3b8e4f2d542a4592e0a889197'
      },
      {
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        privateKey: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        res: '0x0219b3585cac1872491d28ae770b536d7f63584dee0af3c2ba17830538ce88f65d'
      },
      {
        publicKey: '0x02d4d126793b4e653aa7fc4c9e40148d61dbe707085c3cf71fe4702ed36f999c26',
        privateKey: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        res: '0x0219b3585cac1872491d28ae770b536d7f63584dee0af3c2ba17830538ce88f65d'
      }
    ].forEach((spec) => {
      const { publicKey, privateKey, res } = spec;

      it(`should derive ECDH public key for public key ${publicKey} and private key ${privateKey}`, async () => {
        const sharedPublicKey = ECDH.derivePublicKey(publicKey, privateKey);

        expect(sharedPublicKey.toString()).toEqual(res);
      });
    });
  });

  describe('derivePrivateKey', () => {
    [
      {
        privateKey1: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        privateKey2: '0x2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34',
        res: '0xb23c9218df94a2572409625aa0356241d2a916154d231f4c35fde2c2d2bcd202'
      },
      {
        privateKey1: '0x2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34',
        privateKey2: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        res: '0xb23c9218df94a2572409625aa0356241d2a916154d231f4c35fde2c2d2bcd202'
      },
      {
        privateKey1: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        privateKey2: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        res: '0xe1740ba7c8f39c9898622be91cc7c5019b0453006c1669860e5349057318a40e'
      },
      {
        privateKey1: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        privateKey2: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        res: '0xe1740ba7c8f39c9898622be91cc7c5019b0453006c1669860e5349057318a40e'
      },
      {
        privateKey1: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        privateKey2: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        res: '0x3b8a8003f04278cd57f944fd96dc82092d1414e96ffc140b416d4fb693262117'
      },
      {
        privateKey1: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        privateKey2: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        res: '0x3b8a8003f04278cd57f944fd96dc82092d1414e96ffc140b416d4fb693262117'
      },
      {
        privateKey1: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        privateKey2: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        res: '0xb302b16b9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f97f63434e'
      },
      {
        privateKey1: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        privateKey2: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        res: '0xb302b16b9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f97f63434e'
      }
    ].forEach((spec) => {
      const { privateKey1, privateKey2, res } = spec;

      it(`should derive ECDH private key for private keys ${privateKey1} and ${privateKey2}`, async () => {
        const sharedPrivateKey = ECDH.derivePrivateKey(privateKey1, privateKey2);

        expect(sharedPrivateKey.toString()).toEqual(res);
      });

      it(`should derive ECDH both private and public keys for private keys ${privateKey1} and ${privateKey2}`, async () => {
        const sharedPrivateKey = ECDH.derivePrivateKey(privateKey1, privateKey2);

        expect(sharedPrivateKey.toString()).toEqual(res);

        const publicKey1 = new PrivateKey(privateKey1).toPublicKey();
        const publicKey2 = new PrivateKey(privateKey2).toPublicKey();

        const sharedPublicKey1 = ECDH.derivePublicKey(publicKey1, privateKey2);
        const sharedPublicKey2 = ECDH.derivePublicKey(publicKey2, privateKey1);
        expect(sharedPublicKey1.toString()).toEqual(sharedPublicKey2.toString());

        expect(sharedPublicKey1.toString()).toEqual(sharedPrivateKey.toPublicKey().toString());
      });
    });
  });
});
