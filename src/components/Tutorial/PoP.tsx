import React, { MouseEventHandler } from 'react';
import { Button } from 'react-bootstrap';

interface IProps {
  onClickNext: MouseEventHandler;
}

const PoP = ({ onClickNext }: IProps) => {
  return (
    <div>
      <h3>Proof of Possession</h3>

      <p>
        <strong>Proof of Possession</strong> is an important technique of proving that a party sending a message owns a
        specific cryptographic key. This is used as a proof that the correct party is sending the message, under the
        assumption that only that sender has possession of the key. It is typically demonstrated by having the
        presenter/counterparty sign a value determined by the recipient using the key possessed by the
        presenter/counterparty.
      </p>

      <p>
        In addition to preventing <strong>human errors</strong> or the counterparty from <strong>DoS</strong> the shared
        key by providing a key it doesn't possess, this is one of the possible mitigations against the{' '}
        <strong>Rouge Key Attack</strong>, where the counterparty will choose a specially crafted public key to either
        try to "cancel" your public key, during the shared key generation phase or to weaken its security.
      </p>

      <p>
        As another complementary counter-measure for <strong>Rouge Key Attack</strong>, you can use a{' '}
        <a href="https://en.wikipedia.org/wiki/Commitment_scheme" target="_blank" rel="noopener noreferrer">
          Commit-Reveal
        </a>{' '}
        scheme to split the exchange of the public keys into a <strong>Commit</strong> phase (e.g., providing a hash/
        <a href="https://en.wikipedia.org/wiki/HMAC" target="_blank" rel="noopener noreferrer">
          HMAC
        </a>{' '}
        of the public keys) and a <strong>Reveal</strong> phase (providing the actual public keys and verifying that
        they conform to the previous commitments).
      </p>

      <p>We recommend that:</p>
      <ol>
        <li>
          The message shouldn't have been chosen by the presenter/counterparty itself and should contain some data that
          is hard to determine ahead of time (e.g., some random data provided by you).
        </li>
        <li>
          The message should include a commitment to the actual public key (e.g., having the public key or its hash
          appear in its contents).
        </li>
        <li>The message should include a recent timestamp (to reduce key grinding attacks).</li>
      </ol>
      <Button className="tutorial-next" onClick={onClickNext}>
        Next
      </Button>
    </div>
  );
};

export default PoP;
