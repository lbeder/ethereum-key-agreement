import React, { useState, ChangeEvent } from 'react';

import { Row, Col, FormGroup, FormLabel, FormControl, FormCheck, InputGroup } from 'react-bootstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Textarea from 'react-validation/build/textarea';
import Button from 'react-validation/build/button';

import { isValidSignature } from '../../utils/Validators';
import { ECDSA } from '../../utils/ECDSA';
import CopyToClipboard from '../CopyToClipboard';

const ConvertMessage = () => {
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [prefix, setPrefix] = useState(true);
  const [publicKey, setPublicKey] = useState('');
  const [address, setAddress] = useState('');

  const onSubmit = (event: MouseEvent) => {
    event.preventDefault();

    const pubKey = ECDSA.recoverFromMessage(message, signature, prefix);
    if (pubKey === null) {
      return;
    }

    setPublicKey(pubKey.toString());
    setAddress(pubKey.toChecksumAddress());
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

  const onChangePrefix = ({ target }: ChangeEvent) => {
    const element = target as HTMLInputElement;
    const { checked } = element;

    setPrefix(checked);
  };

  return (
    <>
      <Form className="web3-component-form" onSubmit={onSubmit}>
        <h5>Input</h5>

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
            <small className="form-text text-muted">130 characters long hexadecimal signature</small>
          </Col>
        </FormGroup>

        <FormGroup as={Row}>
          <Col md={2}>
            <FormLabel>EIP712 Prefix</FormLabel>
          </Col>
          <Col md={9}>
            <FormCheck type="checkbox" name="prefix" checked={prefix} onChange={onChangePrefix} />
            <small className="form-text text-muted">
              Please check if the message was prefixed according to{' '}
              <a
                href="https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                EIP712
              </a>{' '}
              (e.g., MyCrypto, MyEtherWallet, geth)
            </small>
          </Col>
        </FormGroup>

        <Button className="btn btn-primary" type="submit">
          Convert
        </Button>
      </Form>

      <Form className="web3-component-result">
        <h5>Output</h5>

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
              Please use this section carefully to derive your public key and address from a private key.
            </small>

            { /* prettier-ignore */ }
            <small className="form-text text-muted">
              Given a message <strong><i>M</i></strong> and an ECDSA signature <strong><i>S=[v,r,s]</i></strong>:
              <ul>
                <li>The derived public key would be <strong><i>r<sup>-1</sup>(sR-zG)</i></strong> where <strong><i>z</i></strong> is the lowest <strong><i>n</i></strong> bits of the hash of the message{' '}
                (where <strong><i>n</i></strong> is the bit size of the curve) and <strong><i>v</i></strong> is used for selecting one of the possible two <strong><i>R</i></strong> points).</li>
                <li>The derived public address would be the <strong>rightmost 160-bits</strong> of the{' '}
                <a
                  href="https://en.wikipedia.org/wiki/SHA-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Keccak-256 Hash Function
                </a> of the corresponding public key.</li>
              </ul>
            </small>
          </Col>
        </FormGroup>
      </Form>
    </>
  );
};

export default ConvertMessage;
