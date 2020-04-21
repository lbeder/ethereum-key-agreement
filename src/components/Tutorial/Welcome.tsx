import React, { MouseEventHandler } from 'react';
import { Button } from 'react-bootstrap';

interface IProps {
  onClickNext: MouseEventHandler;
}

const Welcome = ({ onClickNext }: IProps) => {
  return (
    <div>
      <h3>Welcome!</h3>

      <p>
        This project is created to ease <strong>key exchange and agreement protocols</strong> for Ethereum.
      </p>

      <p>
        It should be used to generate a shared public and private key pair between adversarial counterparties, which can
        be used to open a secure communication channel or effectively act as a 2-out-of-2 multisig (whenever using an
        on-chain multisig smart contract or fully privacy-preserving MPC isn't applicable).
      </p>

      { /* prettier-ignore */ }
      <p>
        These protocols can be easily extended to <strong>n-out-of-n</strong> schemes and can also be used in a
        hierarchical key sharing way (e.g., a master shared key <strong><i>M</i></strong>{' '}
        is derived via a <strong>2-out-of-2</strong> combination of keys <strong><i>a</i></strong> and <strong><i>b</i></strong>, while{' '}
        both <strong><i>a</i></strong> and <strong><i>b</i></strong> are derived via additional <strong>5-out-of-5</strong>{' '}
        and <strong>3-out-of-3</strong> combinations respectively).
      </p>

      <p>The project currently supports the following protocols:</p>
      <ul>
        <li>
          <strong>Proof of Possession</strong>
        </li>
        <li>
          <strong>Elliptic Curve Diffie–Hellman (ECDH) Key Agreement</strong>
        </li>
        <li>
          <strong>Key Aggregation Key Agreement</strong>
        </li>
      </ul>

      <p>
        For your convenience, we have also provided the following tools to help you with public key extraction and
        address conversion:
      </p>
      <ul>
        <li>Convert a private key to a public key and an address</li>
        <li>Convert a public key to an address</li>
        <li>
          Extract a public key from a signed message (with or without an{' '}
          <a
            href="https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            EIP712
          </a>{' '}
          prefix) and convert it to an address
        </li>
        <li>Extract a public key from a signed transaction and convert it to an address</li>
      </ul>

      <p>
        <strong>CAUTION:</strong> We recommend running the tool in <strong>offline mode</strong> (e.g., on an air-gapped
        machine or without internet access), as plaintext private keys are being used. We have added an online/offline
        state detection widget just for that.
      </p>
      <Button className="tutorial-next" onClick={onClickNext}>
        Next
      </Button>
    </div>
  );
};

export default Welcome;
