import React, { MouseEventHandler } from 'react';
import { Button } from 'react-bootstrap';

interface IProps {
  onClickNext: MouseEventHandler;
}

const ECDH = ({ onClickNext }: IProps) => {
  return (
    <div>
      <h3>Elliptic Curve Diffie–Hellman (ECDH)</h3>

      <p>
        The shared public key is derived using the{' '}
        <a
          href="https://en.wikipedia.org/wiki/Elliptic Curve_Diffie%E2%80%93Hellman"
          target="_blank"
          rel="noopener noreferrer"
        >
          Elliptic Curve Diffie–Hellman (ECDH)
        </a>{' '}
        key agreement protocol.
      </p>

      { /* prettier-ignore */ }
      <p>
                    If Alice and Bob have private keys <strong><i>a</i></strong>, and <strong><i>b</i></strong> and corresponding public keys <strong><i>aG</i></strong>, and <strong><i>bG</i></strong>, then:
                  </p>

      { /* prettier-ignore */ }
      <ul>
                    <li>The shared public key would be <strong><i>abG</i></strong>.</li>
                    <li>The shared private key would be <strong><i>ab</i></strong>.</li>
                  </ul>

      <p>
        Please make sure to verify the ownerships of the public keys using the <strong>Proof of Possession</strong>{' '}
        method above to avoid <strong>DoS</strong> and <strong>Rouge Key Attacks</strong>.
      </p>

      <p>
        Please be aware that if you are using a public key sourced from a hardware wallet, you will require your seed in
        order to recover your aggregated shared private key (by first extracting the relevant private key using a{' '}
        <a
          href="https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"
          target="_blank"
          rel="noopener noreferrer"
        >
          BIP39
        </a>{' '}
        tool, preferably in a cold storage environment).
      </p>

      <Button className="tutorial-next" onClick={onClickNext}>
        Next
      </Button>
    </div>
  );
};

export default ECDH;
