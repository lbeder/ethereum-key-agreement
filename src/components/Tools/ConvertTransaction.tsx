import { ChangeEvent, useState } from 'react';
import { Col, FormControl, FormGroup, FormLabel, InputGroup, Row } from 'react-bootstrap';
import Button from 'react-validation/build/button';
import Form from 'react-validation/build/form';
import Textarea from 'react-validation/build/textarea';
import { ECDSA } from '../../utils/ECDSA';
import { isHex } from '../../utils/Validators';
import CopyToClipboard from '../CopyToClipboard';

const ConvertTransaction = () => {
  const [txData, setTxData] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [address, setAddress] = useState('');

  const onSubmit = (event: MouseEvent) => {
    event.preventDefault();

    const pubKey = ECDSA.recoverFromSignedTransaction(txData);
    if (pubKey === null) {
      return;
    }

    setPublicKey(pubKey.toString());
    setAddress(pubKey.toChecksumAddress());
  };

  const onChangeTxData = ({ target }: ChangeEvent) => {
    const element = target as HTMLInputElement;
    const { value } = element;

    setTxData(value);
  };

  return (
    <>
      <Form className="web3-component-form" onSubmit={onSubmit}>
        <h5>Input</h5>

        <FormGroup as={Row}>
          <Col md={2}>
            <FormLabel>Signed Transaction</FormLabel>
          </Col>
          <Col md={9}>
            <Textarea
              className="form-control bytes"
              type="text"
              name="txData"
              placeholder="0x"
              rows={4}
              value={txData}
              validations={[isHex]}
              onChange={onChangeTxData}
            />
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
            <small className="form-text">
              Please use this section carefully to derive your public key and address from a signed transaction.
            </small>

            { /* prettier-ignore */ }
            <small className="form-text">
              Given a signed transaction <strong><i>T=[0xf8, ... v, r, s]</i></strong> with an embedded ECDSA signature <strong><i>S=[v,r,s]</i></strong>:
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

export default ConvertTransaction;
