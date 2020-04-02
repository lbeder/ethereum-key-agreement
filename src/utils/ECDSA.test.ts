import { ECDSA } from './ECDSA';

describe('ECDSA', () => {
  describe('sign', () => {
    [
      {
        message: 'Hello World!',
        signature:
          '0xd53e1beb5d33520725d03a7067cbb937cf7d7ee3a8d15d76b66e7fae4b60c0f35a3106466982de23e8a7f0da496acb144a1d2f19c780f60a1051c4d0042c3f581c',
        privateKey: '0x2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34'
      },
      {
        message: '9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature:
          '0xa01eb0464fdf7a322de55951fb8e3caad5d5c7dac4610ef80c71f2acc25a6df95770fadf72cb287c6030ef6ef9358ee2afa42b1298f848ac4428c68a8cfec1441c',
        privateKey: '0x2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34'
      },
      {
        message: '',
        signature:
          '0x8b9a004a6e1c29d6a956b8034f06687b3777e5fe4224ea49f73d8e2a5262ff105f2b5ea3575399c9166cf0028d6f28fb1b0866f5e368ee2261c0158aad15aa8f1c',
        privateKey: '0x2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34'
      },
      {
        message: 'Hello World!',
        signature:
          '0x610b17fba53a481206d60b7bd06a1b0725fc654d5b7035a98353900f00d9b98d6f03e86705b6cbf6391f52813df9aa660c6711a5b0c99ee271239a6c526fb5281c',
        privateKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8'
      },
      {
        message: '9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature:
          '0x770951a57a579c8b56ecdfc91656a875bc9ca8be847502a3e91b2c780531009325602755a99105ee8e5f4223aa38537d577bd27ba56d06da1d549649ff5eda691b',
        privateKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8'
      },
      {
        message: '',
        signature:
          '0x6fde986f059f7d60c3fbb9948aba47f7997d98654cff35f7cd2b494558c478610674b4d8d5cae9c0e8b4f4b82974e4aed8499b31c9dd49613f27ef8716eccaf31b',
        privateKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8'
      }
    ].forEach((spec) => {
      const { message, signature, privateKey } = spec;

      it(`should generate valid signature on message "${message}"`, async () => {
        expect(ECDSA.sign(message, privateKey)).toEqual(signature);
      });
    });
  });

  describe('verify', () => {
    [
      {
        message: 'Hello World!',
        signature:
          '0xd53e1beb5d33520725d03a7067cbb937cf7d7ee3a8d15d76b66e7fae4b60c0f35a3106466982de23e8a7f0da496acb144a1d2f19c780f60a1051c4d0042c3f581c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37'
      },
      {
        message: '9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature:
          '0xa01eb0464fdf7a322de55951fb8e3caad5d5c7dac4610ef80c71f2acc25a6df95770fadf72cb287c6030ef6ef9358ee2afa42b1298f848ac4428c68a8cfec1441c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37'
      },
      {
        message: '',
        signature:
          '0x8b9a004a6e1c29d6a956b8034f06687b3777e5fe4224ea49f73d8e2a5262ff105f2b5ea3575399c9166cf0028d6f28fb1b0866f5e368ee2261c0158aad15aa8f1c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37'
      },
      {
        message: 'Hello World!',
        signature:
          '0x610b17fba53a481206d60b7bd06a1b0725fc654d5b7035a98353900f00d9b98d6f03e86705b6cbf6391f52813df9aa660c6711a5b0c99ee271239a6c526fb5281c',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8'
      },
      {
        message: '9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature:
          '0x770951a57a579c8b56ecdfc91656a875bc9ca8be847502a3e91b2c780531009325602755a99105ee8e5f4223aa38537d577bd27ba56d06da1d549649ff5eda691b',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8'
      },
      {
        message: '',
        signature:
          '0x6fde986f059f7d60c3fbb9948aba47f7997d98654cff35f7cd2b494558c478610674b4d8d5cae9c0e8b4f4b82974e4aed8499b31c9dd49613f27ef8716eccaf31b',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8'
      }
    ].forEach((spec) => {
      const { message, signature, publicKey } = spec;

      it(`should verify signature on message "${message}" and signature ${signature}`, async () => {
        expect(ECDSA.verify(message, signature, publicKey)).toBeTruthy();
      });
    });

    [
      {
        message: 'Hello World2!',
        signature:
          '0xd53e1beb5d33520725d03a7067cbb937cf7d7ee3a8d15d76b66e7fae4b60c0f35a3106466982de23e8a7f0da496acb144a1d2f19c780f60a1051c4d0042c3f581c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37'
      },
      {
        message: 'Hello World!',
        signature:
          '0xc53e1beb5d33520725d03a7067cbb937cf7d7ee3a8d15d76b66e7fae4b60c0f35a3106466982de23e8a7f0da496acb144a1d2f19c780f60a1051c4d0042c3f581c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37'
      },
      {
        message: 'Hello World!',
        signature:
          '0xd53e1beb5d33520725d03a7067cbb937cf7d7ee3a8d15d76b66e7fae4b60c0f35a3106466982de23e8a7f0da496acb144a1d2f19c780f60a1051c4d0042c3f581c',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8'
      },
      {
        message: 'aaaa9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature:
          '0xa01eb0464fdf7a322de55951fb8e3caad5d5c7dac4610ef80c71f2acc25a6df95770fadf72cb287c6030ef6ef9358ee2afa42b1298f848ac4428c68a8cfec1441c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37'
      },
      {
        message: '9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature:
          '0xb01eb0464fdf7a322de55951fb8e3caad5d5c7dac4610ef80c71f2acc25a6df95770fadf72cb287c6030ef6ef9358ee2afa42b1298f848ac4428c68a8cfec1441c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37'
      },
      {
        message: '9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature:
          '0xa01eb0464fdf7a322de55951fb8e3caad5d5c7dac4610ef80c71f2acc25a6df95770fadf72cb287c6030ef6ef9358ee2afa42b1298f848ac4428c68a8cfec1441c',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8'
      },
      {
        message: '   ',
        signature:
          '0x8b9a004a6e1c29d6a956b8034f06687b3777e5fe4224ea49f73d8e2a5262ff105f2b5ea3575399c9166cf0028d6f28fb1b0866f5e368ee2261c0158aad15aa8f1c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37'
      },
      {
        message: '',
        signature:
          '0x7b9a004a6e1c29d6a956b8034f06687b3777e5fe4224ea49f73d8e2a5262ff105f2b5ea3575399c9166cf0028d6f28fb1b0866f5e368ee2261c0158aad15aa8f1c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37'
      },
      {
        message: '',
        signature:
          '0x8b9a004a6e1c29d6a956b8034f06687b3777e5fe4224ea49f73d8e2a5262ff105f2b5ea3575399c9166cf0028d6f28fb1b0866f5e368ee2261c0158aad15aa8f1c',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8'
      }
    ].forEach((spec) => {
      const { message, signature, publicKey } = spec;

      it(`should detect invalid signature on message "${message}" and signature ${signature}`, async () => {
        expect(ECDSA.verify(message, signature, publicKey)).toBeFalsy();
      });
    });
  });
});
