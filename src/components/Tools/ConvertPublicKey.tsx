import React, { useState, ChangeEvent } from 'react';

import { Row, Col, FormGroup, FormLabel, FormControl, InputGroup } from 'react-bootstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';

import { isPublicKey } from '../../utils/Validators';
import { PublicKey } from '../../utils/PublicKey';
import CopyToClipboard from '../CopyToClipboard';

const ConvertPublicKey = () => {
  const [publicKey, setPublicKey] = useState('');
  const [address, setAddress] = useState('');

  const onSubmit = (event: MouseEvent) => {
    event.preventDefault();

    const pubKey = new PublicKey(publicKey);
    setAddress(pubKey.toChecksumAddress());
  };

  const onChangePublicKey = ({ target }: ChangeEvent) => {
    const element = target as HTMLInputElement;
    const { value } = element;

    setPublicKey(value);
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
              name="publicKey1"
              placeholder="0x"
              value={publicKey}
              validations={[isPublicKey]}
              onChange={onChangePublicKey}
            />
            <small className="form-text">
              66 characters long hexadecimal compressed/uncompressed public key (1+32 bytes or 1+64 bytes). The key
              should start with either 0x02, 0x03, or 0x04
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
            <small className="form-text">
              Please use this section carefully to derive your address from a public key.
            </small>

            { /* prettier-ignore */ }
            <small className="form-text">
              Given a public key <strong><i>aG</i></strong>:
              <ul>
                <li>The derived public address would be the <strong>rightmost 160-bits</strong> of the{' '}
                 <a
                  href="https://en.wikipedia.org/wiki/SHA-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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

export default ConvertPublicKey;
