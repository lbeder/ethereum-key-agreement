import { PrivateKey } from './PrivateKey';
import { Aggregation } from './Aggregation';

describe('Aggregation', () => {
  describe('derivePublicKey', () => {
    [
      {
        publicKey1: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        publicKey2: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        res: '0x0317571e5f18a9e7f584a49b876eef72a69585c1ca70d9704bd342879a11c43351',
      },
      {
        publicKey1: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        publicKey2: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        res: '0x0317571e5f18a9e7f584a49b876eef72a69585c1ca70d9704bd342879a11c43351',
      },
      {
        publicKey1: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
        publicKey2: '0x02d4d126793b4e653aa7fc4c9e40148d61dbe707085c3cf71fe4702ed36f999c26',
        res: '0x02aa22479a661b72b89e9daa4f515d8c69c4cbbc4149d7658ecd09311b2217fb3e',
      },
      {
        publicKey1: '0x02d4d126793b4e653aa7fc4c9e40148d61dbe707085c3cf71fe4702ed36f999c26',
        publicKey2: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
        res: '0x02aa22479a661b72b89e9daa4f515d8c69c4cbbc4149d7658ecd09311b2217fb3e',
      },
      {
        publicKey1: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        publicKey2: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
        res: '0x028a120ca4ba1fb807ac59d78296be0f1e8d11e1f792def8a96ec90b5707eeb4b1',
      },
      {
        publicKey1: '0x03ec93666d9e5beaec73d367d66f118223b9bc7a2ca054ad84ad0b9029a2ad2868',
        publicKey2: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        res: '0x028a120ca4ba1fb807ac59d78296be0f1e8d11e1f792def8a96ec90b5707eeb4b1',
      },
      {
        publicKey1: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        publicKey2: '0x02d4d126793b4e653aa7fc4c9e40148d61dbe707085c3cf71fe4702ed36f999c26',
        res: '0x03e2be09e6742dd3af9c23bb7c8745f1209f207f19e4fb937af4a17db09d2cc804',
      },
      {
        publicKey1: '0x02d4d126793b4e653aa7fc4c9e40148d61dbe707085c3cf71fe4702ed36f999c26',
        publicKey2: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        res: '0x03e2be09e6742dd3af9c23bb7c8745f1209f207f19e4fb937af4a17db09d2cc804',
      }
    ].forEach(spec => {
      const { publicKey1, publicKey2, res } = spec;

      it(`should derive aggregated public key for public keys ${publicKey1} and ${publicKey2}`, async () => {
        const sharedPublicKey = Aggregation.derivePublicKey(publicKey1, publicKey2);

        expect(sharedPublicKey.toString()).toEqual(res);
      });
    });
  });

  describe('derivePrivateKey', () => {
    [
      {
        privateKey1: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        privateKey2: '0x2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34',
        res: '0x72973b2eb9f2ff621c25276a518d2e2a81c75bcc5d44664ebd0c933ce40b08af',
      },
      {
        privateKey1: '0x2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34',
        privateKey2: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        res: '0x72973b2eb9f2ff621c25276a518d2e2a81c75bcc5d44664ebd0c933ce40b08af',
      },
      {
        privateKey1: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        privateKey2: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        res: '0xfd3c32a6e57ee111e79a076460c900419c98c444a329133f417fc57d61c25273',
      },
      {
        privateKey1: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        privateKey2: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        res: '0xfd3c32a6e57ee111e79a076460c900419c98c444a329133f417fc57d61c25273',
      },
      {
        privateKey1: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        privateKey2: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        res: '0xdf1c44dd7df8c803b7ba1bda68fde6e3a831c161e8661b8cd90f833867d7ec31',
      },
      {
        privateKey1: '0x9c2044b4c7ee77b0d9a6105f0d50c0f397efd5317d47c21b8fab8fb2060dcdb6',
        privateKey2: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        res: '0xdf1c44dd7df8c803b7ba1bda68fde6e3a831c161e8661b8cd90f833867d7ec31',
      },
      {
        privateKey1: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        privateKey2: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        res: '0xa417ee1ad39ab9b3ec080280af25653e14eadb4390ffaa94fb382951bd7ea338',
      },
      {
        privateKey1: '0x611bedf21d9069610df3f70553783f4e04a8ef1325e15123b1d435cb5bb484bd',
        privateKey2: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        res: '0xa417ee1ad39ab9b3ec080280af25653e14eadb4390ffaa94fb382951bd7ea338',
      }
    ].forEach(spec => {
      const { privateKey1, privateKey2, res } = spec;

      it(`should derive aggregated private key for private keys ${privateKey1} and ${privateKey2}`, async () => {
        const sharedPrivateKey = Aggregation.derivePrivateKey(privateKey1, privateKey2);

        expect(sharedPrivateKey.toString()).toEqual(res);
      });

      it(`should derive aggregated both private and public keys for private keys ${privateKey1} and ${privateKey2}`, async () => {
        const sharedPrivateKey = Aggregation.derivePrivateKey(privateKey1, privateKey2);

        expect(sharedPrivateKey.toString()).toEqual(res);

        const publicKey1 = new PrivateKey(privateKey1).toPublicKey();
        const publicKey2 = new PrivateKey(privateKey2).toPublicKey();

        const sharedPublicKey1 = Aggregation.derivePublicKey(publicKey1, publicKey2);
        const sharedPublicKey2 = Aggregation.derivePublicKey(publicKey2, publicKey1);
        expect(sharedPublicKey1.toString()).toEqual(sharedPublicKey2.toString());

        expect(sharedPublicKey1.toString()).toEqual(sharedPrivateKey.toPublicKey().toString());
      });
    });
  });
});
