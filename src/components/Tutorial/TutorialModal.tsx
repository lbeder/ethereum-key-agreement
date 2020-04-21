import React, { useRef } from 'react';
import { Modal, ModalProps, Container, Row, Col, Image } from 'react-bootstrap';
import Slider from 'react-slick';

import Welcome from './Welcome';
import PoP from './PoP';
import ECDH from './ECDH';
import Aggregated from './Aggregated';
import Tools from './Tools';
import SMPC from './SMPC';

import puzzle from '../../images/puzzle-l.png';

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
  AGGREGATED_PRIVATE_KEY: 'aggregated-private-key',
  CONVERT_PRIVATE_KEY: 'convert-private-key',
  CONVERT_PUBLIC_KEY: 'convert-public-key',
  EXTRACT_FROM_MESSAGE: 'extract-from-message',
  EXTRACT_FROM_TRANSACTION: 'extract-from-transaction',
  SMPC_PUBLIC_KEY: 'smpc-public-key',
  SMPC_PRIVATE_KEY: 'smpc-private-key'
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

      case SLIDE_KEYS.CONVERT_PRIVATE_KEY:
      case SLIDE_KEYS.CONVERT_PUBLIC_KEY:
      case SLIDE_KEYS.EXTRACT_FROM_MESSAGE:
      case SLIDE_KEYS.EXTRACT_FROM_TRANSACTION:
        return 4;

      case SLIDE_KEYS.SMPC_PRIVATE_KEY:
      case SLIDE_KEYS.SMPC_PUBLIC_KEY:
        return 5;

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
                <Welcome onClickNext={onClickNext} />
                <PoP onClickNext={onClickNext} />
                <ECDH onClickNext={onClickNext} />
                <Aggregated onClickNext={onClickNext} />
                <Tools onClickNext={onClickNext} />
                <SMPC onClickNext={onClickNext} />
              </Slider>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default TutorialModal;
