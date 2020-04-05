import React, { useState, MouseEvent, ChangeEvent } from 'react';

import { Row, Col, FormGroup, FormLabel, FormControl, InputGroup } from 'react-bootstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';

import { isPrivateKey } from '../../utils/Validators';
import { ECDH } from '../../utils/ECDH';
import CopyToClipboard from '../CopyToClipboard';

const ECDHPrivateKey = () => {
  const [inputData, setInputData] = useState({
    privateKey1: '',
    privateKey2: ''
  });

  const [publicKey, setPublicKey] = useState('');
  const [address, setAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const onChangeInput = ({ target }: ChangeEvent) => {
    const element = target as HTMLInputElement;
    const { value, name } = element;

    setInputData({ ...inputData, [name]: value });
  };

  const onSubmit = (event: MouseEvent) => {
    event.preventDefault();

    const { privateKey1, privateKey2 } = inputData;
    const sharedPrivateKey = ECDH.derivePrivateKey(privateKey1, privateKey2);
    setPrivateKey(sharedPrivateKey.toString());

    const sharedPublicKey = sharedPrivateKey.toPublicKey();
    setPublicKey(sharedPublicKey.toString());

    setAddress(sharedPublicKey.toChecksumAddress());
  };

  return (
    <>
      <Form className="web3-component-form" onSubmit={onSubmit}>
        <h5>Input</h5>

        <FormGroup as={Row}>
          <Col md={2}>
            <FormLabel>Private Key #1</FormLabel>
          </Col>
          <Col md={9}>
            <Input
              className="form-control key"
              type="password"
              name="privateKey1"
              placeholder="0x"
              value={inputData.privateKey1}
              validations={[isPrivateKey]}
              onChange={onChangeInput}
            />
            <small className="form-text text-muted">64 characters long hexadecimal private key (32 bytes)</small>
          </Col>
        </FormGroup>

        <FormGroup as={Row}>
          <Col md={2}>
            <FormLabel>Private Key #2</FormLabel>
          </Col>
          <Col md={9}>
            <Input
              className="form-control key"
              type="password"
              name="privateKey2"
              placeholder="0x"
              value={inputData.privateKey2}
              validations={[isPrivateKey]}
              onChange={onChangeInput}
            />
            <small className="form-text text-muted">64 characters long hexadecimal private key (32 bytes)</small>
          </Col>
        </FormGroup>

        <Button className="btn btn-primary" type="submit">
          Derive Shared Key
        </Button>
      </Form>

      <Form className="web3-component-result">
        <h5>Output</h5>

        <FormGroup as={Row}>
          <Col md={2}>
            <FormLabel>Shared Public Key</FormLabel>
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
            <FormLabel>Shared Address</FormLabel>
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

        <FormGroup as={Row}>
          <Col md={2}>
            <FormLabel>Shared Private Key</FormLabel>
          </Col>
          <Col md={9}>
            <InputGroup className="mb-3">
              <FormControl className="key" type="text" value={privateKey} readOnly={true} />
              <InputGroup.Append>
                <CopyToClipboard text={privateKey} />
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </FormGroup>
      </Form>

      <Form className="web3-component-notes">
        <FormGroup as={Row}>
          <Col md={12}>
            <small className="form-text text-muted">
              The shared public key is derived using the{' '}
              <a href="https://en.wikipedia.org/wiki/Elliptic Curve_Diffie%E2%80%93Hellman">
                Elliptic Curve Diffie–Hellman (ECDH)
              </a>{' '}
              key agreement protocol.
            </small>

            { /* prettier-ignore */ }
            <small className="form-text text-muted">
              If Alice and Bob have private keys <strong><i>a</i></strong>, and <strong><i>b</i></strong> and corresponding public keys <strong><i>aG</i></strong>, and <strong><i>bG</i></strong>, then:
              <ul>
                <li>The shared public key would be <strong><i>abG</i></strong>.</li>
                <li>The shared private key would be <strong><i>ab</i></strong>.</li>
              </ul>
            </small>
          </Col>
        </FormGroup>
      </Form>
    </>
  );
};

export default ECDHPrivateKey;
