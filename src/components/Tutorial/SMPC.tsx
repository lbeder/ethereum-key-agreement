import React, { MouseEventHandler } from 'react';

interface IProps {
  onClickNext: MouseEventHandler;
}

const SMPC = (props: IProps) => {
  return (
    <div>
      <h3>Secure Multi-party Computation (SMPC)</h3>

      <p>
        Even though both of the ECDH and the Aggregation key agreement protocols are cryptographically sound, they
        suffer from the following disadvantages:
      </p>
      <ul>
        <li>
          Public keys are exposed (and thus leaked) during the agreement phase, thus sacrificing some privacy aspects of
          the counterparties
        </li>
        <li>
          Private keys are exposed (and thus leaked) during the derivation/signing phase, thus effectively restricting
          the shared private key to one-time usage
        </li>
      </ul>

      <p>
        In the case when either higher level of privacy or recurring usage of the private key, an 
        <a
          href="https://en.wikipedia.org/wiki/Secure_multi-party_computation"
          target="_blank"
          rel="noopener noreferrer"
        >
          Secure Multi-party Computation (SMPC)
        </a>
         based{' '}
        <a
          href="https://en.wikipedia.org/wiki/Distributed_key_generation protocol"
          target="_blank"
          rel="noopener noreferrer"
        >
          Distributed Key Generation (DKG)
        </a>{' '}
        should be used instead.
      </p>

      <p>We are considering adding the future versions DKG protocols based on the following researches:</p>
      <ul>
        <li>
          <a href="https://dl.acm.org/doi/10.1145/3243734.3243859" target="_blank" rel="noopener noreferrer">
            Rosario Gennaro and Steven Goldfeder. 2018.{' '}
            <strong>Fast Multiparty Threshold ECDSA with Fast Trustless Setup.</strong> In Proceedings of the 2018 ACM
            SIGSAC Conference on Computer and Communications Security (CCS ’18). Association for Computing Machinery,
            New York, NY, USA, 1179–1194.
          </a>
        </li>
        <li>
          <a href="https://dl.acm.org/doi/10.1145/3243734.3243788" target="_blank" rel="noopener noreferrer">
            Yehuda Lindell and Ariel Nof. 2018.{' '}
            <strong>
              Fast Secure Multiparty ECDSA with Practical Distributed Key Generation and Applications to Cryptocurrency
              Custody.
            </strong>{' '}
            In Proceedings of the 2018 ACM SIGSAC Conference on Computer and Communications Security (CCS ’18).
            Association for Computing Machinery, New York, NY, USA, 1837–1854.
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SMPC;
