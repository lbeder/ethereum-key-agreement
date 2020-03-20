import React, { useState } from 'react';

import { Row, Col, FormGroup, FormLabel, FormControl, InputGroup } from 'react-bootstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';

import { isPrivateKey, isPublicKey } from '../../utils/validators';
import { ECDH } from '../../utils/crypto';
import CopyToClipboard from '../CopyToClipboard';

const SharedPublicKey = () => {
  const [inputData, setInputData] = useState({
    privateKey: '',
    publicKey: ''
  });

  const [address, setAddress] = useState('');
  const [publicKey, setPublicKey] = useState('');

  const onChangeUpdateInput = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setInputData({ ...inputData, [name]: value });
  };

  const onSubmit = event => {
    event.preventDefault();

    // Get the compressed shared public key.
    const sharedPublicKey = ECDH.derivePublicKey(inputData.publicKey, inputData.privateKey);
    setPublicKey(sharedPublicKey.toString());

    // Derive the shared address.
    setAddress(sharedPublicKey.toChecksumAddress());
  };

  return (
    <>
      <Form
        className="web3-component-form"
        onSubmit={onSubmit}
      >
        <h5>Input</h5>

        <FormGroup as={Row}>
          <Col md={2}>
            <FormLabel>Your Private Key</FormLabel>
          </Col>
          <Col md={9}>
            <Input
              className="form-control key"
              type="password"
              name="privateKey"
              placeholder="0x"
              value={inputData.privateKey}
              validations={[isPrivateKey]}
              onChange={onChangeUpdateInput}
            />
            <small className="form-text text-muted">64 characters long hexadecimal private key (32 bytes)</small>
          </Col>
        </FormGroup>

        <FormGroup as={Row}>
          <Col md={2}>
            <FormLabel>Other Public Key</FormLabel>
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
            <small className="form-text text-muted">66 characters long hexadecimal <strong>compressed</strong> public
            key (1+32 bytes). The key should start with either 0x02 or 0x03.</small>
          </Col>
        </FormGroup>

        <FormGroup as={Row}>
          <Col md={12}>
            <small className="form-text text-muted">
              The shared public key is derived using the
              <a href="https://en.wikipedia.org/wiki/Elliptic Curve_Diffie%E2%80%93Hellman">Elliptic Curve
              Diffie–Hellman (ECDH)</a> key agreement protocol. If Alice and Bob have private keys <i>a</i>, and
              <i>b</i> and corresponding public keys <i>aG</i>, and <i>bG</i>, then the shared public key would be
              <i>abG</i>.
            </small>
          </Col>
        </FormGroup>

        <Button
          className="btn btn-primary"
          type="submit"
        >Derive Shared Key
        </Button>
      </Form>

      <Form className="web3-component-result">
        <h5>Output</h5>

        <FormGroup as={Row}>
          <Col md={2}>
            <FormLabel>Shared Address</FormLabel>
          </Col>
          <Col md={9}>
            <InputGroup className="mb-3">
              <FormControl
                className="address"
                type="text"
                value={address}
                readOnly
              />
              <InputGroup.Append>
                <CopyToClipboard text={address} />
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </FormGroup>

        <FormGroup as={Row}>
          <Col md={2}>
            <FormLabel>Shared Public Key</FormLabel>
          </Col>
          <Col md={9}>
            <InputGroup className="mb-3">
              <FormControl
                className="key"
                type="text"
                value={publicKey}
                readOnly
              />
              <InputGroup.Append>
                <CopyToClipboard text={publicKey} />
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </FormGroup>
      </Form >
    </>
  );
};

export default SharedPublicKey;
