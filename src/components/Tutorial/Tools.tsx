import React, { MouseEventHandler } from 'react';
import { Button } from 'react-bootstrap';

interface IProps {
  onClickNext: MouseEventHandler;
}

const Tools = ({ onClickNext }: IProps) => {
  return (
    <div>
      <h3>Public Key and Address Extraction</h3>

      <p>
        For your convenience, we have also provided the following tools to help you with public key extraction and
        address conversion:
      </p>
      <ul>
        <li>Convert a private key to a public key and an address</li>
        <li>Convert a public key to an address</li>
      </ul>

      <p>
        If you are using a hardware device such as a{' '}
        <a href="https://www.ledger.com/" target="_blank" rel="noopener noreferrer">
          Ledger
        </a>{' '}
        or{' '}
        <a href="https://trezor.io/" target="_blank" rel="noopener noreferrer">
          Trezor
        </a>
        , or prefer not to input your private key into this app you may extract your public key and Ethereum address
        using one of the following methods:
      </p>
      <ul>
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

      <Button className="tutorial-next" onClick={onClickNext}>
        Next
      </Button>
    </div>
  );
};

export default Tools;
