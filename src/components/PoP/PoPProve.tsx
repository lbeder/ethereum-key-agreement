import React, { useState, MouseEvent, ChangeEvent } from 'react';

import { Row, Col, FormGroup, FormLabel, FormControl, InputGroup } from 'react-bootstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import { format } from 'date-fns';

import { isPrivateKey, isPresent } from '../../utils/Validators';
import { PrivateKey } from '../../utils/PrivateKey';
import { ECDSA } from '../../utils/ECDSA';
import CopyToClipboard from '../CopyToClipboard';

const PoPProve = () => {
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [challenge, setChallenge] = useState('');
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');

  const onChangePrivateKey = ({ target }: ChangeEvent) => {
    const element = target as HTMLInputElement;
    const value = element.value;

    setPrivateKey(value);

    updateData(value);
  };

  const onChangeChallenge = ({ target }: ChangeEvent) => {
    const element = target as HTMLInputElement;
    const value = element.value;

    setChallenge(value);

    updateData(privateKey);
  };

  const updateData = (privKey: string) => {
    if (!PrivateKey.isValid(privKey)) {
      return;
    }

    const pubKey = new PrivateKey(privKey).toPublicKey().toString();
    const timestamp = format(new Date(), 'yyyy-MMM-dd');
    let msg = `I herby certify that on ${timestamp} I owned the corresponding private key for public key ${pubKey}.`;
    if (challenge.length > 0) {
      msg = `${msg}\n\nI acknowledge the received "${challenge}" challenge.`;
    }

    setPublicKey(pubKey);
    setMessage(msg);
  };

  const onSubmit = (event: MouseEvent) => {
    event.preventDefault();

    setSignature(ECDSA.sign(message, privateKey));
  };

  return (
    <>
      <Form className="web3-component-form" onSubmit={onSubmit}>
        <h5>Input</h5>

        <FormGroup as={Row}>
          <Col md={2}>
            <FormLabel>Private Key</FormLabel>
          </Col>
          <Col md={9}>
            <Input
              className="form-control key"
              type="password"
              name="privateKey"
              placeholder="0x"
              value={privateKey}
              validations={[isPrivateKey]}
              onChange={onChangePrivateKey}
            />
            <small className="form-text text-muted">64 characters long hexadecimal private key (32 bytes)</small>
          </Col>
        </FormGroup>

        <FormGroup as={Row}>
          <Col md={2}>
            <FormLabel>Challenge</FormLabel>
          </Col>
          <Col md={9}>
            <Input
              className="form-control"
              type="text"
              name="challenge"
              placeholder=""
              value={challenge}
              validations={[isPresent]}
              onChange={onChangeChallenge}
            />
            <small className="form-text text-muted">
              The hard to determine challenge which was provided to you by the counterparty
            </small>
          </Col>
        </FormGroup>

        <FormGroup as={Row}>
          <Col md={2}>
            <FormLabel>Public Key</FormLabel>
          </Col>
          <Col md={9}>
            <InputGroup className="mb-3">
              <FormControl className="key" type="text" value={publicKey} readOnly={true} />
              <InputGroup.Append>
                <CopyToClipboard text={publicKey} />
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </FormGroup>

        <FormGroup as={Row}>
          <Col md={2}>
            <FormLabel>Message</FormLabel>
          </Col>
          <Col md={9}>
            <InputGroup>
              <FormControl as="textarea" rows={4} value={message} readOnly={true} />
              <InputGroup.Append>
                <CopyToClipboard text={message} />
              </InputGroup.Append>
            </InputGroup>
            <small className="mb-3 form-text text-muted">
              The message that used for signing. Please note that the "\n" literal will be replaced with a new line
            </small>
          </Col>
        </FormGroup>

        <Button className="btn btn-primary" type="submit">
          Sign
        </Button>
      </Form>

      <Form className="web3-component-result">
        <h5>Output</h5>

        <FormGroup as={Row}>
          <Col md={2}>
            <FormLabel>Signature</FormLabel>
          </Col>
          <Col md={9}>
            <InputGroup className="mb-3">
              <FormControl className="signature" type="text" value={signature} readOnly={true} />
              <InputGroup.Append>
                <CopyToClipboard text={signature} />
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

export default PoPProve;
