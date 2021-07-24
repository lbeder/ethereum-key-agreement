import chai from 'chai';
import dirtyChai from 'dirty-chai';
import { ECDSA } from './ECDSA';

chai.use(dirtyChai);
const { expect } = chai;

describe('ECDSA', () => {
  describe('recoverFromMessage', () => {
    [
      {
        message: 'Hello World!',
        signature:
          '0xd53e1beb5d33520725d03a7067cbb937cf7d7ee3a8d15d76b66e7fae4b60c0f35a3106466982de23e8a7f0da496acb144a1d2f19c780f60a1051c4d0042c3f581c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        prefix: true
      },
      {
        message: 'Hello World!',
        signature:
          '0xfde9bab678d45a078d2fd78416c9e4228c9256187e517a8ce35b53f0b58e336116d46eb4ceec47f1881e26d36c6db82d214cdfda97f8f15cdb383572447f59a61b',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        prefix: false
      },
      {
        message: '9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature:
          '0xa01eb0464fdf7a322de55951fb8e3caad5d5c7dac4610ef80c71f2acc25a6df95770fadf72cb287c6030ef6ef9358ee2afa42b1298f848ac4428c68a8cfec1441c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        prefix: true
      },
      {
        message: '9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature:
          '0x3f5aaea7748a114436f8e77ae8c3105e8f49ca6764852bdc2f55b357d40b65e45f9df50137a8ab1e0d2be8b1ac159107dfb43fe4312dc10f8bb40dffe458431d1c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        prefix: false
      },
      {
        message: '',
        signature:
          '0x8b9a004a6e1c29d6a956b8034f06687b3777e5fe4224ea49f73d8e2a5262ff105f2b5ea3575399c9166cf0028d6f28fb1b0866f5e368ee2261c0158aad15aa8f1c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        prefix: true
      },
      {
        message: '',
        signature:
          '0xc9e77950e5503b174f5ea4400bc5587ab48631660791f8cfc66eb6ca6a4faee552a399c9ce351a9adc0524ce7cf67b284c217c5266d4ad68a87aad38255bde291b',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        prefix: false
      },
      {
        message: 'Hello World!',
        signature:
          '0x610b17fba53a481206d60b7bd06a1b0725fc654d5b7035a98353900f00d9b98d6f03e86705b6cbf6391f52813df9aa660c6711a5b0c99ee271239a6c526fb5281c',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        prefix: true
      },
      {
        message: 'Hello World!',
        signature:
          '0x207753ab0c0b3ab9efcc812692268c59669747c4d98eb00d977ac5cfc73092601499e396b8c1c174a97bf31ab54ca002fd07c33853615e9bc9cb472e751ada371c',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        prefix: false
      },
      {
        message: '9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature:
          '0x770951a57a579c8b56ecdfc91656a875bc9ca8be847502a3e91b2c780531009325602755a99105ee8e5f4223aa38537d577bd27ba56d06da1d549649ff5eda691b',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        prefix: true
      },
      {
        message: '9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature:
          '0x641c61b5a204960e9d75da1854a1fb2388d73559606ba54e191b43015cbc37df211f27ac474b7f81eb7297299d89a1adc0b8cca900f508549536f8936d5ba4e31b',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        prefix: false
      },
      {
        message: '',
        signature:
          '0x6fde986f059f7d60c3fbb9948aba47f7997d98654cff35f7cd2b494558c478610674b4d8d5cae9c0e8b4f4b82974e4aed8499b31c9dd49613f27ef8716eccaf31b',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        prefix: true
      },
      {
        message: '',
        signature:
          '0xcf7576fe927a9a65cc8d5696cabd8aeba804d013de75e71615100967f8af84562b4fe037743c6302791b69840f8443f65d1877a0223d6eecd4aadb6df782b0b21b',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        prefix: false
      },
      {
        message: 'Line 1\nLine 2\nLine 3',
        signature:
          '0xef7eaae737608c643d4ceb774d12a0412d5c0ae7e943958d22a4cda6dcb5d1335a65957108ca90a55108b26003f98257158bfa37b16e09b9ba76522c27a9b3371c',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        prefix: true
      },
      {
        message: 'Line 1\nLine 2\nLine 3',
        signature:
          '0x32c02208c17ca689a8477175bdece2951d164250aac8754d5b63e2afc95d85a6074764181ef722ad903a5eb685466f1ba7d52c7846f096b2c3d451430539c1a21b',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        prefix: false
      }
    ].forEach((spec) => {
      const { message, signature, publicKey, prefix } = spec;

      it(`should recover a public from a signature on ${
        prefix ? 'a prefixed' : ''
      } message "${message}" and signature ${signature}`, async () => {
        expect(ECDSA.recoverFromMessage(message, signature, prefix)?.toString()).to.be.equal(publicKey);
      });
    });
  });

  describe('recoverFromSignedTransaction', () => {
    [
      {
        txData:
          '0xf864808502540be40082520894bb7c5835dfd84632228d2602cbcb530cbbb9b5dc808025a04342742f51d7b838067bf0422bc2cf6388570aeb76219ce6b439f6635d70c1a6a0690d06ea26e455f680b4b25df1627940e52cdbc7f8eabf4a4ce05e206ea8f4fa',
        publicKey: '0x038a8b0bd1473eed4385b98668fec46fc5950b86cd2fdd68f914a6f3d35b252c46'
      },
      {
        txData:
          '0xf864808502540be40082a02894bb7c5835dfd84632228d2602cbcb530cbbb9b5dc808025a0f3fa26ca3b1cd5a680fc65c5584c4041898b819f81e9b56b579fcf50266e4817a03234c3092bff879f1ac7e2a3bc33c1fb3c9b00f1122d2fb2d4db4d6c209dc6d0',
        publicKey: '0x038a8b0bd1473eed4385b98668fec46fc5950b86cd2fdd68f914a6f3d35b252c46'
      },
      {
        txData:
          '0xf85f80808252089456f8c51fc3982b79b010968cb7f7413ffb5682fc808025a03960cae3e6d4235473e349f2058caeae44bfbd97b444d7a8e41aefd03cfdf271a0102d883d1ff3b1fad015eaf128814541f638ec9a62ccb29623a4ab3084fc70dc',
        publicKey: '0x0298c54604e2c39b6d09297f11aaa5109445f81c49f440bc7d21ddcc4026cba40c'
      },
      {
        txData:
          '0xf86880808252089456f8c51fc3982b79b010968cb7f7413ffb5682fc89056bc75e2d631000008025a0f2e3eed9ba56d6aa797ae328e82f604456b0f9efd7a791eea70fe5bfe462587aa067bf1962a8db1651ebf7097c3f731b6f41b3b45a70c6e9b266903cd09bd353d2',
        publicKey: '0x0298c54604e2c39b6d09297f11aaa5109445f81c49f440bc7d21ddcc4026cba40c'
      }
    ].forEach((spec) => {
      const { txData, publicKey } = spec;

      it(`should recover a public from a signed transaction "${txData}"`, async () => {
        expect(ECDSA.recoverFromSignedTransaction(txData)?.toString()).to.be.equal(publicKey);
      });
    });

    [
      {
        txData:
          '0x64808502540be40082520894bb7c5835dfd84632228d2602cbcb530cbbb9b5dc808025a04342742f51d7b838067bf0422bc2cf6388570aeb76219ce6b439f6635d70c1a6a0690d06ea26e455f680b4b25df1627940e52cdbc7f8eabf4a4ce05e206ea8f4fa'
      },
      {
        txData:
          '0xf854808502540be40082a02894bb7c5835dfd84632228d2602cbcb530cbbb9b5dc808025a0f3fa26ca3b1cd5a680fc65c5584c4041898b819f81e9b56b579fcf50266e4817a03234c3092bff879f1ac7e2a3bc33c1fb3c9b00f1122d2fb2d4db4d6c209dc6d0'
      },
      {
        txData:
          '0x80808252089456f8c51fc3982b79b010968cb7f7413ffb5682fc808025a03960cae3e6d4235473e349f2058caeae44bfbd97b444d7a8e41aefd03cfdf271a0102d883d1ff3b1fad015eaf128814541f638ec9a62ccb29623a4ab3084fc70dc'
      },
      {
        txData:
          '0xf86880111252089456f8c51fc3982b79b010968cb7f7413ffb5682fc89056bc75e2d631000008025a0f2e3eed9ba56d6aa797ae328e82f604456b0f9efd7a791eea70fe5bfe462587aa067bf1962a8db1651ebf7097c3f731b6f41b3b45a70c6e9b266903cd09bd353d2'
      }
    ].forEach((spec) => {
      const { txData } = spec;

      it(`should unable to recover a public from an invalid signed transaction "${txData}"`, async () => {
        expect(ECDSA.recoverFromSignedTransaction(txData)).to.be.null();
      });
    });
  });

  describe('sign', () => {
    [
      {
        message: 'Hello World!',
        signature:
          '0xd53e1beb5d33520725d03a7067cbb937cf7d7ee3a8d15d76b66e7fae4b60c0f35a3106466982de23e8a7f0da496acb144a1d2f19c780f60a1051c4d0042c3f581c',
        privateKey: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        prefix: true
      },
      {
        message: 'Hello World!',
        signature:
          '0xfde9bab678d45a078d2fd78416c9e4228c9256187e517a8ce35b53f0b58e336116d46eb4ceec47f1881e26d36c6db82d214cdfda97f8f15cdb383572447f59a61b',
        privateKey: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        prefix: false
      },
      {
        message: '9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature:
          '0xa01eb0464fdf7a322de55951fb8e3caad5d5c7dac4610ef80c71f2acc25a6df95770fadf72cb287c6030ef6ef9358ee2afa42b1298f848ac4428c68a8cfec1441c',
        privateKey: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        prefix: true
      },
      {
        message: '9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature:
          '0x3f5aaea7748a114436f8e77ae8c3105e8f49ca6764852bdc2f55b357d40b65e45f9df50137a8ab1e0d2be8b1ac159107dfb43fe4312dc10f8bb40dffe458431d1c',
        privateKey: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        prefix: false
      },
      {
        message: '',
        signature:
          '0x8b9a004a6e1c29d6a956b8034f06687b3777e5fe4224ea49f73d8e2a5262ff105f2b5ea3575399c9166cf0028d6f28fb1b0866f5e368ee2261c0158aad15aa8f1c',
        privateKey: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        prefix: true
      },
      {
        message: '',
        signature:
          '0xc9e77950e5503b174f5ea4400bc5587ab48631660791f8cfc66eb6ca6a4faee552a399c9ce351a9adc0524ce7cf67b284c217c5266d4ad68a87aad38255bde291b',
        privateKey: '0x42fc0028b60a5052de140b7b5bad25f01041ec306b1e59714963f38661ca1e7b',
        prefix: false
      },
      {
        message: 'Hello World!',
        signature:
          '0x610b17fba53a481206d60b7bd06a1b0725fc654d5b7035a98353900f00d9b98d6f03e86705b6cbf6391f52813df9aa660c6711a5b0c99ee271239a6c526fb5281c',
        privateKey: '0x2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34',
        prefix: true
      },
      {
        message: 'Hello World!',
        signature:
          '0x207753ab0c0b3ab9efcc812692268c59669747c4d98eb00d977ac5cfc73092601499e396b8c1c174a97bf31ab54ca002fd07c33853615e9bc9cb472e751ada371c',
        privateKey: '0x2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34',
        prefix: false
      },
      {
        message: '9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature:
          '0x770951a57a579c8b56ecdfc91656a875bc9ca8be847502a3e91b2c780531009325602755a99105ee8e5f4223aa38537d577bd27ba56d06da1d549649ff5eda691b',
        privateKey: '0x2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34',
        prefix: true
      },
      {
        message: '9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature:
          '0x641c61b5a204960e9d75da1854a1fb2388d73559606ba54e191b43015cbc37df211f27ac474b7f81eb7297299d89a1adc0b8cca900f508549536f8936d5ba4e31b',
        privateKey: '0x2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34',
        prefix: false
      },
      {
        message: '',
        signature:
          '0x6fde986f059f7d60c3fbb9948aba47f7997d98654cff35f7cd2b494558c478610674b4d8d5cae9c0e8b4f4b82974e4aed8499b31c9dd49613f27ef8716eccaf31b',
        privateKey: '0x2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34',
        prefix: true
      },
      {
        message: '',
        signature:
          '0xcf7576fe927a9a65cc8d5696cabd8aeba804d013de75e71615100967f8af84562b4fe037743c6302791b69840f8443f65d1877a0223d6eecd4aadb6df782b0b21b',
        privateKey: '0x2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34',
        prefix: false
      },
      {
        message: 'Line 1\nLine 2\nLine 3',
        signature:
          '0xef7eaae737608c643d4ceb774d12a0412d5c0ae7e943958d22a4cda6dcb5d1335a65957108ca90a55108b26003f98257158bfa37b16e09b9ba76522c27a9b3371c',
        privateKey: '0x2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34',
        prefix: true
      },
      {
        message: 'Line 1\nLine 2\nLine 3',
        signature:
          '0x32c02208c17ca689a8477175bdece2951d164250aac8754d5b63e2afc95d85a6074764181ef722ad903a5eb685466f1ba7d52c7846f096b2c3d451430539c1a21b',
        privateKey: '0x2f9b3b0603e8af0f3e111beef5e0083a71856f9bf2260cdd73a89fb68240ea34',
        prefix: false
      }
    ].forEach((spec) => {
      const { message, signature, privateKey, prefix } = spec;

      it(`should generate valid signature on ${prefix ? 'a prefixed' : ''} message "${message}"`, async () => {
        expect(ECDSA.sign(message, privateKey, prefix)).to.be.equal(signature);
      });
    });
  });

  describe('verify', () => {
    [
      {
        message: 'Hello World!',
        signature:
          '0xd53e1beb5d33520725d03a7067cbb937cf7d7ee3a8d15d76b66e7fae4b60c0f35a3106466982de23e8a7f0da496acb144a1d2f19c780f60a1051c4d0042c3f581c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        prefix: true
      },
      {
        message: 'Hello World!',
        signature:
          '0xfde9bab678d45a078d2fd78416c9e4228c9256187e517a8ce35b53f0b58e336116d46eb4ceec47f1881e26d36c6db82d214cdfda97f8f15cdb383572447f59a61b',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        prefix: false
      },
      {
        message: '9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature:
          '0xa01eb0464fdf7a322de55951fb8e3caad5d5c7dac4610ef80c71f2acc25a6df95770fadf72cb287c6030ef6ef9358ee2afa42b1298f848ac4428c68a8cfec1441c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        prefix: true
      },
      {
        message: '9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature:
          '0x3f5aaea7748a114436f8e77ae8c3105e8f49ca6764852bdc2f55b357d40b65e45f9df50137a8ab1e0d2be8b1ac159107dfb43fe4312dc10f8bb40dffe458431d1c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        prefix: false
      },
      {
        message: '',
        signature:
          '0x8b9a004a6e1c29d6a956b8034f06687b3777e5fe4224ea49f73d8e2a5262ff105f2b5ea3575399c9166cf0028d6f28fb1b0866f5e368ee2261c0158aad15aa8f1c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        prefix: true
      },
      {
        message: '',
        signature:
          '0xc9e77950e5503b174f5ea4400bc5587ab48631660791f8cfc66eb6ca6a4faee552a399c9ce351a9adc0524ce7cf67b284c217c5266d4ad68a87aad38255bde291b',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        prefix: false
      },
      {
        message: 'Hello World!',
        signature:
          '0x610b17fba53a481206d60b7bd06a1b0725fc654d5b7035a98353900f00d9b98d6f03e86705b6cbf6391f52813df9aa660c6711a5b0c99ee271239a6c526fb5281c',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        prefix: true
      },
      {
        message: 'Hello World!',
        signature:
          '0x207753ab0c0b3ab9efcc812692268c59669747c4d98eb00d977ac5cfc73092601499e396b8c1c174a97bf31ab54ca002fd07c33853615e9bc9cb472e751ada371c',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        prefix: false
      },
      {
        message: '9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature:
          '0x770951a57a579c8b56ecdfc91656a875bc9ca8be847502a3e91b2c780531009325602755a99105ee8e5f4223aa38537d577bd27ba56d06da1d549649ff5eda691b',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        prefix: true
      },
      {
        message: '9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature:
          '0x641c61b5a204960e9d75da1854a1fb2388d73559606ba54e191b43015cbc37df211f27ac474b7f81eb7297299d89a1adc0b8cca900f508549536f8936d5ba4e31b',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        prefix: false
      },
      {
        message: '',
        signature:
          '0x6fde986f059f7d60c3fbb9948aba47f7997d98654cff35f7cd2b494558c478610674b4d8d5cae9c0e8b4f4b82974e4aed8499b31c9dd49613f27ef8716eccaf31b',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        prefix: true
      },
      {
        message: '',
        signature:
          '0xcf7576fe927a9a65cc8d5696cabd8aeba804d013de75e71615100967f8af84562b4fe037743c6302791b69840f8443f65d1877a0223d6eecd4aadb6df782b0b21b',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        prefix: false
      },
      {
        message: 'Line 1\nLine 2\nLine 3',
        signature:
          '0xef7eaae737608c643d4ceb774d12a0412d5c0ae7e943958d22a4cda6dcb5d1335a65957108ca90a55108b26003f98257158bfa37b16e09b9ba76522c27a9b3371c',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        prefix: true
      },
      {
        message: 'Line 1\nLine 2\nLine 3',
        signature:
          '0x32c02208c17ca689a8477175bdece2951d164250aac8754d5b63e2afc95d85a6074764181ef722ad903a5eb685466f1ba7d52c7846f096b2c3d451430539c1a21b',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        prefix: false
      }
    ].forEach((spec) => {
      const { message, signature, publicKey, prefix } = spec;

      it(`should verify signature on ${
        prefix ? 'a prefixed' : ''
      } message "${message}" and signature ${signature}`, async () => {
        expect(ECDSA.verify(message, signature, publicKey, prefix)).to.be.true();
      });
    });

    [
      {
        message: 'Hello World2!',
        signature:
          '0xd53e1beb5d33520725d03a7067cbb937cf7d7ee3a8d15d76b66e7fae4b60c0f35a3106466982de23e8a7f0da496acb144a1d2f19c780f60a1051c4d0042c3f581c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        prefix: true
      },
      {
        message: 'Hello World!',
        signature:
          '0xc53e1beb5d33520725d03a7067cbb937cf7d7ee3a8d15d76b66e7fae4b60c0f35a3106466982de23e8a7f0da496acb144a1d2f19c780f60a1051c4d0042c3f581c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        prefix: true
      },
      {
        message: 'Hello World!',
        signature:
          '0xd53e1beb5d33520725d03a7067cbb937cf7d7ee3a8d15d76b66e7fae4b60c0f35a3106466982de23e8a7f0da496acb144a1d2f19c780f60a1051c4d0042c3f581c',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        prefix: true
      },
      {
        message: 'Hello World!',
        signature:
          '0xdde9bab678d45a078d2fd78416c9e4228c9256187e517a8ce35b53f0b58e336116d46eb4ceec47f1881e26d36c6db82d214cdfda97f8f15cdb383572447f59a61b',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        prefix: false
      },
      {
        message: 'aaaa9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature:
          '0xa01eb0464fdf7a322de55951fb8e3caad5d5c7dac4610ef80c71f2acc25a6df95770fadf72cb287c6030ef6ef9358ee2afa42b1298f848ac4428c68a8cfec1441c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        prefix: true
      },
      {
        message: '9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature:
          '0xb01eb0464fdf7a322de55951fb8e3caad5d5c7dac4610ef80c71f2acc25a6df95770fadf72cb287c6030ef6ef9358ee2afa42b1298f848ac4428c68a8cfec1441c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        prefix: true
      },
      {
        message: '9a7d450a69e335374d35abc785cfd18ca144947f81b3d6f9',
        signature:
          '0xa01eb0464fdf7a322de55951fb8e3caad5d5c7dac4610ef80c71f2acc25a6df95770fadf72cb287c6030ef6ef9358ee2afa42b1298f848ac4428c68a8cfec1441c',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        prefix: true
      },
      {
        message: '   ',
        signature:
          '0x8b9a004a6e1c29d6a956b8034f06687b3777e5fe4224ea49f73d8e2a5262ff105f2b5ea3575399c9166cf0028d6f28fb1b0866f5e368ee2261c0158aad15aa8f1c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        prefix: true
      },
      {
        message: '',
        signature:
          '0x7b9a004a6e1c29d6a956b8034f06687b3777e5fe4224ea49f73d8e2a5262ff105f2b5ea3575399c9166cf0028d6f28fb1b0866f5e368ee2261c0158aad15aa8f1c',
        publicKey: '0x0221277161bff904a10d629078fe77c66abb98ac9b793a108c8b2ce0584aaacb37',
        prefix: true
      },
      {
        message: '',
        signature:
          '0x8b9a004a6e1c29d6a956b8034f06687b3777e5fe4224ea49f73d8e2a5262ff105f2b5ea3575399c9166cf0028d6f28fb1b0866f5e368ee2261c0158aad15aa8f1c',
        publicKey: '0x0320d1861be48103c6a1e19592301b69548f651f5129fc857b8f314c070dfce6c8',
        prefix: true
      }
    ].forEach((spec) => {
      const { message, signature, publicKey, prefix } = spec;

      it(`should detect invalid signature on${
        prefix ? 'a prefixed' : ''
      } message "${message}" and signature ${signature}`, async () => {
        expect(ECDSA.verify(message, signature, publicKey, prefix)).to.be.false();
      });
    });
  });
});
