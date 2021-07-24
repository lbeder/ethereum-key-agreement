import { ChangeEvent, MouseEvent, useState } from 'react';
import { Col, FormControl, FormGroup, FormLabel, InputGroup, Row } from 'react-bootstrap';
import Button from 'react-validation/build/button';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { Aggregation } from '../../utils/Aggregation';
import { isPublicKey } from '../../utils/Validators';
import CopyToClipboard from '../CopyToClipboard';

const AggregatedPublicKey = () => {
  const [inputData, setInputData] = useState({
    publicKey1: '',
    publicKey2: ''
  });

  const [publicKey, setPublicKey] = useState('');
  const [address, setAddress] = useState('');

  const onChangeInput = ({ target }: ChangeEvent) => {
    const element = target as HTMLInputElement;
    const { value, name } = element;

    setInputData({ ...inputData, [name]: value });
  };

  const onSubmit = (event: MouseEvent) => {
    event.preventDefault();

    const { publicKey1, publicKey2 } = inputData;
    const sharedPublicKey = Aggregation.derivePublicKey(publicKey1, publicKey2);
    setPublicKey(sharedPublicKey.toString());

    setAddress(sharedPublicKey.toChecksumAddress());
  };

  return (
    <>
      <Form className="web3-component-form" onSubmit={onSubmit}>
        <h5>Input</h5>

        <FormGroup as={Row}>
          <Col md={2}>
            <FormLabel>Public Key #1</FormLabel>
          </Col>
          <Col md={9}>
            <Input
              className="form-control key"
              type="text"
              name="publicKey1"
              placeholder="0x"
              value={inputData.publicKey1}
              validations={[isPublicKey]}
              onChange={onChangeInput}
            />
            <small className="form-text">
              66 characters long hexadecimal compressed/uncompressed public key (1+32 bytes or 1+64 bytes). The key
              should start with either 0x02, 0x03, or 0x04
            </small>
          </Col>
        </FormGroup>

        <FormGroup as={Row}>
          <Col md={2}>
            <FormLabel>Public Key #2</FormLabel>
          </Col>
          <Col md={9}>
            <Input
              className="form-control key"
              type="text"
              name="publicKey2"
              placeholder="0x"
              value={inputData.publicKey2}
              validations={[isPublicKey]}
              onChange={onChangeInput}
            />
            <small className="form-text">
              66 characters long hexadecimal compressed/uncompressed public key (1+32 bytes or 1+64 bytes). The key
              should start with either 0x02, 0x03, or 0x04
            </small>
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

            <small className="form-text">
              Please make sure to verify the ownerships of the public keys using the{' '}
              <strong>Proof of Possession</strong> method above to avoid <strong>DoS</strong> and{' '}
              <strong>Rouge Key Attacks</strong>.
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

export default AggregatedPublicKey;
