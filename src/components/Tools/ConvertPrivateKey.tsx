import React, { useState, ChangeEvent } from 'react';

import { Row, Col, FormGroup, FormLabel, FormControl, InputGroup } from 'react-bootstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';

import { isPrivateKey } from '../../utils/Validators';
import { PrivateKey } from '../../utils/PrivateKey';
import CopyToClipboard from '../CopyToClipboard';

const ConvertPrivateKey = () => {
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [address, setAddress] = useState('');

  const onSubmit = (event: MouseEvent) => {
    event.preventDefault();

    const privKey = new PrivateKey(privateKey);
    const pubKey = privKey.toPublicKey();
    setPublicKey(pubKey.toString());
    setAddress(pubKey.toChecksumAddress());
  };

  const onChangePrivateKey = ({ target }: ChangeEvent) => {
    const element = target as HTMLInputElement;
    const value = element.value;

    setPrivateKey(value);
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
              Given a privste key <strong><i>a</i></strong>:
              <ul>
                <li>The derived public key would be <strong><i>aG</i></strong>.</li>
                <li>The derived public address would be the <strong>rightmost 160-bits</strong> of the{' '}
                <a href="https://en.wikipedia.org/wiki/SHA-3">
                  Keccak-256 Hash Function
                </a> of the corresponding public key <strong><i>aG</i></strong>.</li>
              </ul>
            </small>
          </Col>
        </FormGroup>
      </Form>
    </>
  );
};

export default ConvertPrivateKey;
