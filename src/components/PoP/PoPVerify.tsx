import React, { useState, MouseEvent, ChangeEvent } from 'react';

import { Row, Col, FormGroup, FormLabel, FormControl, InputGroup } from 'react-bootstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';

import { isPublicKey, isValidSignature } from '../../utils/Validators';
import { ECDSA } from '../../utils/ECDSA';

const STATUSES = {
  OK: 'ok',
  INVALID: 'invalid',
  WARNING: 'warning',
  UNDEFINED: 'undefined'
};

const PoPVerify = () => {
  const [inputData, setInputData] = useState({
    publicKey: '',
    message: '',
    signature: ''
  });

  const [status, setStatus] = useState({
    status: STATUSES.UNDEFINED,
    message: ''
  });

  const onChangeUpdateInput = ({ target }: ChangeEvent) => {
    const element = target as HTMLInputElement;
    const value = element.type === 'checkbox' ? element.checked : element.value;
    const name = element.name;

    setInputData({ ...inputData, [name]: value });
  };

  const onSubmit = (event: MouseEvent) => {
    event.preventDefault();

    try {
      const { publicKey, message, signature } = inputData;
      if (ECDSA.verifySignature(message, signature, publicKey)) {
        setStatus({
          status: STATUSES.OK,
          message: 'Message signature verified'
        });
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
              value={inputData.publicKey}
              validations={[isPublicKey]}
              onChange={onChangeUpdateInput}
            />
            <small className="form-text text-muted">
              66 characters long hexadecimal <strong>compressed</strong> public key (1+32 bytes). The key should start
              with either 0x02 or 0x03
            </small>
          </Col>
        </FormGroup>

        <FormGroup as={Row}>
          <Col md={2}>
            <FormLabel>Message</FormLabel>
          </Col>
          <Col md={9}>
            <Input
              className="form-control"
              type="text"
              name="message"
              placeholder=""
              value={inputData.message}
              onChange={onChangeUpdateInput}
            />
            <small className="form-text text-muted">The message that used for signing</small>
          </Col>
        </FormGroup>

        <FormGroup as={Row}>
          <Col md={2}>
            <FormLabel>Signature</FormLabel>
          </Col>
          <Col md={9}>
            <Input
              className="form-control key"
              type="text"
              name="signature"
              placeholder="0x"
              value={inputData.signature}
              validations={[isValidSignature]}
              onChange={onChangeUpdateInput}
            />
            <small className="form-text text-muted">
              130 characters long hexadecimal signature proving the ownership of the public key. We assume that the
              signature was generated using one of the popular Ethereum clients (e.g., MyCrypto, MyEtherWallet, geth,
              etc.), therefore assuming that the message was prefixed before signing (with "\x19Ethereum Signed
              Message:\n" + length of the message)
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
