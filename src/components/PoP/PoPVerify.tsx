import React, { useState, MouseEvent, ChangeEvent } from 'react';

import { Row, Col, FormGroup, FormLabel, FormControl, InputGroup } from 'react-bootstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Textarea from 'react-validation/build/textarea';
import Button from 'react-validation/build/button';

import { isPublicKey, isValidSignature } from '../../utils/Validators';
import { ECDSA } from '../../utils/ECDSA';
import CopyToClipboard from '../CopyToClipboard';
import { PublicKey } from 'src/utils/PublicKey';

const STATUSES = {
  OK: 'ok',
  INVALID: 'invalid',
  WARNING: 'warning',
  UNDEFINED: 'undefined'
};

const PoPVerify = () => {
  const [publicKey, setPublicKey] = useState('');
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');

  const [status, setStatus] = useState({
    status: STATUSES.UNDEFINED,
    message: ''
  });

  const [address, setAddress] = useState('');

  const onChangePublicKey = ({ target }: ChangeEvent) => {
    const element = target as HTMLInputElement;
    const { value } = element;

    setPublicKey(value);
  };

  const onChangeMessage = ({ target }: ChangeEvent) => {
    const element = target as HTMLInputElement;
    const { value } = element;

    // Replace "\n" with a new line in order to comply with MyCrypto and MEW.
    setMessage(value.replace(/\\n/g, '\n'));
  };

  const onChangeSignature = ({ target }: ChangeEvent) => {
    const element = target as HTMLInputElement;
    const { value } = element;

    setSignature(value);
  };

  const onSubmit = (event: MouseEvent) => {
    event.preventDefault();

    try {
      if (ECDSA.verify(message, signature, publicKey)) {
        setStatus({
          status: STATUSES.OK,
          message: 'Message signature verified'
        });

        setAddress(new PublicKey(publicKey).toChecksumAddress());
      } else {
        setStatus({ status: STATUSES.INVALID, message: 'Invalid signature' });
      }
    } catch (err) {
      setStatus({ status: STATUSES.INVALID, message: err.message });
    }
  };

  const statusClassName = () => {
    switch (status.status) {
      case STATUSES.OK:
        return 'is-valid';

      case STATUSES.INVALID:
        return 'is-invalid';

      case STATUSES.WARNING:
        return 'is-invalid';

      default:
        return;
    }
  };

  return (
    <>
      <Form className="web3-component-form" onSubmit={onSubmit}>
        <h5>Input</h5>

        <FormGroup as={Row}>
          <Col md={2}>
            <FormLabel>Public Key</FormLabel>
          </Col>
          <Col md={9}>
            <Input
              className="form-control key"
              type="text"
              name="publicKey"
              placeholder="0x"
              value={publicKey}
              validations={[isPublicKey]}
              onChange={onChangePublicKey}
            />
            <small className="form-text text-muted">
              66 characters long hexadecimal compressed/uncompressed public key (1+32 bytes or 1+64 bytes). The key
              should start with either 0x02, 0x03, or 0x04
            </small>
          </Col>
        </FormGroup>

        <FormGroup as={Row}>
          <Col md={2}>
            <FormLabel>Message</FormLabel>
          </Col>
          <Col md={9}>
            <Textarea
              className="form-control"
              type="text"
              name="message"
              placeholder=""
              rows={4}
              value={message}
              onChange={onChangeMessage}
            />
            <small className="form-text text-muted">
              The message that used for signing. Please note that the "\n" literal will be replaced with a new line
            </small>
          </Col>
        </FormGroup>

        <FormGroup as={Row}>
          <Col md={2}>
            <FormLabel>Signature</FormLabel>
          </Col>
          <Col md={9}>
            <Input
              className="form-control signature"
              type="text"
              name="signature"
              placeholder="0x"
              value={signature}
              validations={[isValidSignature]}
              onChange={onChangeSignature}
            />
            <small className="form-text text-muted">
              130 characters long hexadecimal signature proving the ownership of the public key. We assume that the
              signature was generated using one of the popular Ethereum clients (e.g., MyCrypto, MyEtherWallet, geth,
              etc.), therefore assuming that the message was prefixed according to{' '}
              <a
                href=" https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                EIP712
              </a>{' '}
              before signing
            </small>
          </Col>
        </FormGroup>

        <Button className="btn btn-primary" type="submit">
          Verify
        </Button>
      </Form>

      <Form className="web3-component-result">
        <h5>Status</h5>

        <FormGroup as={Row}>
          <Col md={2}>
            <FormLabel>Result</FormLabel>
          </Col>
          <Col md={9}>
            <InputGroup className="mb-3">
              <FormControl type="text" className={statusClassName()} value={status.message} readOnly={true} />
            </InputGroup>
          </Col>
        </FormGroup>

        <FormGroup as={Row}>
          <Col md={2}>
            <FormLabel>Address</FormLabel>
          </Col>
          <Col md={9}>
            <InputGroup className="mb-3">
              <FormControl className="address" type="text" value={address} readOnly={true} />
              <InputGroup.Append>
                <CopyToClipboard text={address} />
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </FormGroup>
      </Form>

      <Form className="web3-component-notes">
        <FormGroup as={Row}>
          <Col md={12}>
            <small className="form-text text-muted">
              <strong>Proof of Possession</strong> is an important technique of proving that a party sending a message
              owns a specific cryptographic key. This is used as a proof that the correct party is sending the message,
              under the assumption that only that sender has possession of the key. It is typically demonstrated by
              having the presenter/counterparty sign a value determined by the recipient using the key possessed by the
              presenter/counterparty.
            </small>

            <small className="form-text text-muted">
              In addition for preventing the counterparty from <strong>DoS</strong> the shared key by providing a key it
              doesn't possess, this is one of the possible mitigations against the <strong>Rouge Key Attack</strong>,
              where the counterparty will choose a specially crafted public key to either try to "cancel" your public
              key, during the shared key generation phase or to weaken its security.
            </small>

            <small className="form-text text-muted">
              We recommend that:
              <ol>
                <li>
                  The message shouldn't have been chosen by the presenter/counterparty itself and should contain some
                  data that is hard to determine ahead of time (e.g., some random data provided by you).
                </li>
                <li>
                  The message should include a commitment to the actual public key (e.g., having the public key or its
                  hash appear in its contents).
                </li>
                <li>The message should include a recent timestamp (to reduce key grinding attacks).</li>
              </ol>
            </small>
          </Col>
        </FormGroup>
      </Form>
    </>
  );
};

export default PoPVerify;
