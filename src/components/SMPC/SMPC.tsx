import React from 'react';

import { Row, Col, FormGroup } from 'react-bootstrap';
import Form from 'react-validation/build/form';

const SMPC = () => {
  return (
    <Form className="web3-component-notes">
      <h5>
        SMPC <span className="tbd">coming soon</span>
      </h5>

      <FormGroup as={Row}>
        <Col md={12}>
          <small className="form-text">
            Even though both of the ECDH and the Aggregation key agreement protocols are cryptographically sound, they
            suffer from the following disadvantages:
            <ul>
              <li>
                Public keys are exposed (and thus leaked) during the agreement phase, thus sacrificing some privacy
                aspects of the counterparties
              </li>
              <li>
                Private keys are exposed (and thus leaked) during the derivation/signing phase, thus effectively
                restricting the shared private key to one-time usage
              </li>
            </ul>
          </small>

          <small className="form-text">
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
          </small>

          <small className="form-text">
            We are considering adding the future versions DKG protocols based on the following researches:
            <ul>
              <li>
                <a href="https://dl.acm.org/doi/10.1145/3243734.3243859" target="_blank" rel="noopener noreferrer">
                  Rosario Gennaro and Steven Goldfeder. 2018.{' '}
                  <strong>Fast Multiparty Threshold ECDSA with Fast Trustless Setup.</strong> In Proceedings of the 2018
                  ACM SIGSAC Conference on Computer and Communications Security (CCS ’18). Association for Computing
                  Machinery, New York, NY, USA, 1179–1194.
                </a>
              </li>
              <li>
                <a href="https://dl.acm.org/doi/10.1145/3243734.3243788" target="_blank" rel="noopener noreferrer">
                  Yehuda Lindell and Ariel Nof. 2018.{' '}
                  <strong>
                    Fast Secure Multiparty ECDSA with Practical Distributed Key Generation and Applications to
                    Cryptocurrency Custody.
                  </strong>{' '}
                  In Proceedings of the 2018 ACM SIGSAC Conference on Computer and Communications Security (CCS ’18).
                  Association for Computing Machinery, New York, NY, USA, 1837–1854.
                </a>
              </li>
            </ul>
          </small>
        </Col>
      </FormGroup>
    </Form>
  );
};

export default SMPC;
