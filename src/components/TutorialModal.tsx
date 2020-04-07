import React, { useRef } from 'react';
import { Modal, ModalProps, Container, Row, Col, Button, Image } from 'react-bootstrap';
import Slider from 'react-slick';

import puzzle from '../images/puzzle-l.png';

import './TutorialModal.scss';

export interface TutorialModalProps extends ModalProps {
  slide: string;
}

const TUTORIAL_OPENED_FLAG_NAME = 'eka:tutorial-opened';
export const tutorialHasBeenOpened = (): boolean => {
  return localStorage.getItem(TUTORIAL_OPENED_FLAG_NAME) !== null;
};

export const SLIDE_KEYS = {
  POP_PROVE_KEYS: 'pop-prove-keys',
  POP_VERIFY_KEYS: 'pop-verify-keys',
  ECDH_PUBLIC_KEY: 'ecdh-public-key',
  ECDH_PRIVATE_KEY: 'ecdh-private-key',
  AGGREGATED_PUBLIC_KEY: 'aggregated-public-key',
  AGGREGATED_PRIVATE_KEY: 'aggregated-private-key'
};

const TutorialModal = (props: TutorialModalProps) => {
  const slider = useRef<Slider>(null);

  const onClickNext = () => {
    if (slider.current === null) {
      return;
    }

    slider.current.slickNext();
  };

  const initialSlide = (): number => {
    // If this is the first time that the tutorial is opened - show the "Welcome" slide.
    if (!tutorialHasBeenOpened()) {
      return 0;
    }

    switch (props.slide) {
      case SLIDE_KEYS.POP_PROVE_KEYS:
      case SLIDE_KEYS.POP_VERIFY_KEYS:
        return 1;

      case SLIDE_KEYS.ECDH_PUBLIC_KEY:
      case SLIDE_KEYS.ECDH_PRIVATE_KEY:
        return 2;

      case SLIDE_KEYS.AGGREGATED_PUBLIC_KEY:
      case SLIDE_KEYS.AGGREGATED_PRIVATE_KEY:
        return 3;

      default:
        return 0;
    }
  };

  if (!props.show && !tutorialHasBeenOpened()) {
    localStorage.setItem(TUTORIAL_OPENED_FLAG_NAME, 'true');
  }

  return (
    <Modal
      {...props}
      size="xl"
      centered={true}
      className="tutorial-modal"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Body>
        <Container>
          <Row>
            <Col md={3} className="left-panel text-center">
              <div className="logo">
                <Image src={puzzle} className="logo-img" />
              </div>
            </Col>

            <Col md={9} className="right-panel">
              <Slider
                ref={slider}
                initialSlide={initialSlide()}
                dots={true}
                arrows={false}
                infinite={false}
                fade={true}
                autoplay={false}
                adaptiveHeight={true}
                slidesToShow={1}
                slidesToScroll={1}
              >
                <div>
                  <h3>Welcome!</h3>

                  <p>
                    This project is created to ease <strong>key exchange and agreement protocols</strong> for Ethereum.{' '}
                  </p>

                  <p>
                    It should be used to generate a shared public and private key pair between adversarial
                    counterparties, which can be used to open a secure communication channel or effectively act as a
                    2-out-of-2 multisig (whenever using an on-chain multisig smart contract or fully privacy-preserving
                    MPC isn't applicable).
                  </p>

                  <p>The project currently supports the following protocols:</p>

                  <ul>
                    <li>
                      <strong>Proof of Possession</strong>
                    </li>
                    <li>
                      <strong>Elliptic Curve Diffie–Hellman (ECDH) Key Agreement</strong>
                    </li>
                    <li>
                      <strong>Key Aggregation Key Agreement</strong>
                    </li>
                  </ul>

                  <p>
                    <strong>CAUTION:</strong> We recommend running the tool in <strong>offline mode</strong> (e.g., on
                    an air-gapped machine or without internet access), as plaintext private keys are being used. We have
                    added an online/offline state detection widget just for that.
                  </p>

                  <Button className="tutorial-next" onClick={onClickNext}>
                    Next
                  </Button>
                </div>

                <div>
                  <h3>Proof of Possession</h3>

                  <p>
                    <strong>Proof of Possession</strong> is an important technique of proving that a party sending a
                    message owns a specific cryptographic key. This is used as a proof that the correct party is sending
                    the message, under the assumption that only that sender has possession of the key. It is typically
                    demonstrated by having the presenter/counterparty sign a value determined by the recipient using the
                    key possessed by the presenter/counterparty.
                  </p>

                  <p>
                    In addition for preventing the counterparty from <strong>DoS</strong> the shared key by providing a
                    key it doesn't possess, this is one of the possible mitigations against the{' '}
                    <strong>Rouge Key Attack</strong>, where the counterparty will choose a specially crafted public key
                    to either try to "cancel" your public key, during the shared key generation phase or to weaken its
                    security.
                  </p>

                  <p>We recommend that:</p>

                  <ol>
                    <li>
                      The message shouldn't have been chosen by the presenter/counterparty itself and should contain
                      some data that is hard to determine ahead of time (e.g., some random data provided by you).
                    </li>
                    <li>
                      The message should include a commitment to the actual public key (e.g., having the public key or
                      its hash appear in its contents).
                    </li>
                    <li>The message should include a recent timestamp (to reduce key grinding attacks).</li>
                  </ol>

                  <Button className="tutorial-next" onClick={onClickNext}>
                    Next
                  </Button>
                </div>

                <div>
                  <h3>Elliptic Curve Diffie–Hellman (ECDH)</h3>

                  <p>
                    The shared public key is derived using the{' '}
                    <a href="https://en.wikipedia.org/wiki/Elliptic Curve_Diffie%E2%80%93Hellman">
                      Elliptic Curve Diffie–Hellman (ECDH)
                    </a>{' '}
                    key agreement protocol.
                  </p>

                  { /* prettier-ignore */ }
                  <p>
                    If Alice and Bob have private keys <strong><i>a</i></strong>, and <strong><i>b</i></strong> and corresponding public keys <strong><i>aG</i></strong>, and <strong><i>bG</i></strong>, then:
                  </p>

                  { /* prettier-ignore */ }
                  <ul>
                    <li>The shared public key would be <strong><i>abG</i></strong>.</li>
                    <li>The shared private key would be <strong><i>ab</i></strong>.</li>
                  </ul>

                  <p>
                    Please make sure to verify the ownerships of the public keys using the{' '}
                    <strong>Proof of Possession</strong> method above to avoid <strong>DoS</strong> and{' '}
                    <strong>Rouge Key Attacks</strong>.
                  </p>

                  <Button className="tutorial-next" onClick={onClickNext}>
                    Next
                  </Button>
                </div>

                <div>
                  <h3>Key Aggregation</h3>

                  <p>The shared public key is derived using the key aggregation key agreement protocol.</p>

                  { /* prettier-ignore */ }
                  <p>
                    If Alice and Bob have
                    private keys <strong><i>a</i></strong>, and <strong><i>b</i></strong> and corresponding public keys <strong><i>aG</i></strong>, and <strong><i>bG</i></strong>, then:
                  </p>

                  { /* prettier-ignore */ }
                  <ul>
                      <li>The shared public key would be <strong><i>(a + b)G</i></strong>.</li>
                      <li>The shared private key would be <strong><i>a + b</i></strong>.</li>
                    </ul>

                  <p>
                    Please make sure to verify the ownerships of the public keys using the{' '}
                    <strong>Proof of Possession</strong> method above to avoid <strong>DoS</strong> and{' '}
                    <strong>Rouge Key Attacks</strong>.
                  </p>
                </div>
              </Slider>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default TutorialModal;
