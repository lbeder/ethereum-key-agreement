import { ChangeEvent, MouseEvent, useState } from 'react';
import { Col, FormControl, FormGroup, FormLabel, InputGroup, Row } from 'react-bootstrap';
import Button from 'react-validation/build/button';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { Aggregation } from '../../utils/Aggregation';
import { isPrivateKey } from '../../utils/Validators';
import CopyToClipboard from '../CopyToClipboard';

const AggregatedPrivateKey = () => {
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
    const sharedPrivateKey = Aggregation.derivePrivateKey(privateKey1, privateKey2);
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
            <small className="form-text">64 characters long hexadecimal private key (32 bytes)</small>
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
            <small className="form-text">64 characters long hexadecimal private key (32 bytes)</small>
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
            <small className="form-text">
              The shared public key is derived using the key aggregation key agreement protocol.
            </small>

            { /* prettier-ignore */ }
            <small className="form-text">
              If Alice and Bob have
              private keys <strong><i>a</i></strong>, and <strong><i>b</i></strong> and corresponding public keys <strong><i>aG</i></strong>, and <strong><i>bG</i></strong>, then:
              <ul>
                <li>The shared public key would be <strong><i>(a + b)G</i></strong>.</li>
                <li>The shared private key would be <strong><i>a + b</i></strong>.</li>
              </ul>
            </small>

            { /* prettier-ignore */ }
            <small className="form-text">
              This scheme can be easily extended to an <strong>n-out-of-n</strong> scheme as well:
              For example, if Alice, Bob, and Carol have private keys <strong><i>a</i></strong>, <strong><i>b</i></strong>, and <strong><i>c</i></strong> and corresponding public keys <strong><i>aG</i></strong>, <strong><i>bG</i></strong>, and <strong><i>cG</i></strong>, then:
              <ul>
                <li>The shared public key would be <strong><i>(a + b + c)G</i></strong>.</li>
                <li>The shared private key would be <strong><i>a + b + c</i></strong>.</li>
              </ul>
            </small>
          </Col>
        </FormGroup>
      </Form>
    </>
  );
};

export default AggregatedPrivateKey;
