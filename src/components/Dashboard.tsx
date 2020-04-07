import React, { useState } from 'react';
import { Tab, Row, Col, Nav, Button } from 'react-bootstrap';
import { HelpCircle } from 'react-feather';

import { PoPProve, PoPVerify } from './PoP';
import { ECDHPublicKey, ECDHPrivateKey } from './ECDH';
import { AggregatedPublicKey, AggregatedPrivateKey } from './Aggregation';
import { ConvertPrivateKey, ConvertPublicKey, ConvertMessage, ConvertTransaction } from './Tools';
import TutorialModal, { SLIDE_KEYS, tutorialHasBeenOpened } from './TutorialModal';

import './Dashboard.scss';

const Dashboard = () => {
  const [tutorial, setTutorial] = useState(!tutorialHasBeenOpened());
  const [slide, setSlide] = useState(SLIDE_KEYS.POP_PROVE_KEYS);

  const onCloseTutorial = () => setTutorial(false);
  const onShowTutorial = () => setTutorial(true);

  const onSelectNavLink = (eventKey: string) => {
    setSlide(eventKey);
  };

  return (
    <div className="dashboard">
      <Tab.Container defaultActiveKey={SLIDE_KEYS.POP_PROVE_KEYS}>
        <Row>
          <Col md={2}>
            <Nav variant="pills" className="flex-column">
              <div className="section">
                <Button variant="info" onClick={onShowTutorial}>
                  Tutorial
                  <HelpCircle size={24} className="float-right" />
                </Button>
              </div>

              <div className="section">
                <Nav.Item>
                  <Nav.Link className="title" eventKey="disabled" disabled={true}>
                    Proof of Possession
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey={SLIDE_KEYS.POP_PROVE_KEYS} onSelect={onSelectNavLink}>
                    Prove Keys
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey={SLIDE_KEYS.POP_VERIFY_KEYS} onSelect={onSelectNavLink}>
                    Verify Keys
                  </Nav.Link>
                </Nav.Item>
              </div>

              <div className="section">
                <Nav.Item>
                  <Nav.Link className="title" eventKey="disabled" disabled={true}>
                    ECDH
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey={SLIDE_KEYS.ECDH_PUBLIC_KEY} onSelect={onSelectNavLink}>
                    Shared Public Key
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey={SLIDE_KEYS.ECDH_PRIVATE_KEY} onSelect={onSelectNavLink}>
                    Shared Private Key
                  </Nav.Link>
                </Nav.Item>
              </div>

              <div className="section">
                <Nav.Item>
                  <Nav.Link className="title" eventKey="disabled" disabled={true}>
                    Aggregation
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey={SLIDE_KEYS.AGGREGATED_PUBLIC_KEY} onSelect={onSelectNavLink}>
                    Shared Public Key
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey={SLIDE_KEYS.AGGREGATED_PRIVATE_KEY} onSelect={onSelectNavLink}>
                    Shared Private Key
                  </Nav.Link>
                </Nav.Item>
              </div>

              <div className="section">
                <Nav.Item>
                  <Nav.Link className="title" eventKey="disabled" disabled={true}>
                    Tools
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="convert-private-key">Convert Private Key</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="convert-public-key">Convert Public Key</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="convert-message">Convert Message</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="convert-transaction">Convert Transaction</Nav.Link>
                </Nav.Item>
              </div>
            </Nav>
          </Col>

          <Col md={10} className="web3-component">
            <Tab.Content>
              <Tab.Pane eventKey={SLIDE_KEYS.POP_PROVE_KEYS}>
                <PoPProve />
              </Tab.Pane>
              <Tab.Pane eventKey={SLIDE_KEYS.POP_VERIFY_KEYS}>
                <PoPVerify />
              </Tab.Pane>
              <Tab.Pane eventKey={SLIDE_KEYS.ECDH_PUBLIC_KEY}>
                <ECDHPublicKey />
              </Tab.Pane>
              <Tab.Pane eventKey={SLIDE_KEYS.ECDH_PRIVATE_KEY}>
                <ECDHPrivateKey />
              </Tab.Pane>
              <Tab.Pane eventKey={SLIDE_KEYS.AGGREGATED_PUBLIC_KEY}>
                <AggregatedPublicKey />
              </Tab.Pane>
              <Tab.Pane eventKey={SLIDE_KEYS.AGGREGATED_PRIVATE_KEY}>
                <AggregatedPrivateKey />
              </Tab.Pane>
              <Tab.Pane eventKey="convert-private-key">
                <ConvertPrivateKey />
              </Tab.Pane>
              <Tab.Pane eventKey="convert-public-key">
                <ConvertPublicKey />
              </Tab.Pane>
              <Tab.Pane eventKey="convert-message">
                <ConvertMessage />
              </Tab.Pane>
              <Tab.Pane eventKey="convert-transaction">
                <ConvertTransaction />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      <TutorialModal show={tutorial} slide={slide} onHide={onCloseTutorial} />
    </div>
  );
};

export default Dashboard;
