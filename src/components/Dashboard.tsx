import React from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap';

import PoPVerify from './PoP/PoPVerify';
import ECDHPublicKey from './ECDH/ECDHPublicKey';
import ECDHPrivateKey from './ECDH/ECDHPrivateKey';
import AggregatedPublicKey from './Aggregation/AggregatedPublicKey';
import AggregatedPrivateKey from './Aggregation/AggregatedPrivateKey';
import PrivateKeyConversion from './Conversion/PrivateKeyConversion';
import PublicKeyConversion from './Conversion/PublicKeyConversion';

import './Dashboard.scss';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Tab.Container defaultActiveKey="verify-keys">
        <Row>
          <Col md={2}>
            <Nav variant="pills" className="flex-column">
              <h6>Key Agreement</h6>

              <div className="section">
                <Nav.Item>
                  <Nav.Link className="title" eventKey="disabled" disabled={true}>
                    Proof of Possession
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="verify-keys">Verify Keys</Nav.Link>
                </Nav.Item>
              </div>

              <div className="section">
                <Nav.Item>
                  <Nav.Link className="title" eventKey="disabled" disabled={true}>
                    ECDH
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="ecdh-public-key">Shared Public Key</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="ecdh-private-key">Shared Private Key</Nav.Link>
                </Nav.Item>
              </div>

              <div className="section">
                <Nav.Item>
                  <Nav.Link className="title" eventKey="disabled" disabled={true}>
                    Aggregation
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="aggregated-public-key">Shared Public Key</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="aggregated-private-key">Shared Private Key</Nav.Link>
                </Nav.Item>
              </div>

              <h6 className="tools">Additional Tools</h6>

              <div className="section">
                <Nav.Item>
                  <Nav.Link className="title" eventKey="disabled" disabled={true}>
                    Key Conversion
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="private-key-conversion">Private Key</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="public-key-conversion">Public Key</Nav.Link>
                </Nav.Item>
              </div>
            </Nav>
          </Col>

          <Col md={10} className="web3-component">
            <Tab.Content>
              <Tab.Pane eventKey="verify-keys">
                <PoPVerify />
              </Tab.Pane>
              <Tab.Pane eventKey="ecdh-public-key">
                <ECDHPublicKey />
              </Tab.Pane>
              <Tab.Pane eventKey="ecdh-private-key">
                <ECDHPrivateKey />
              </Tab.Pane>
              <Tab.Pane eventKey="aggregated-public-key">
                <AggregatedPublicKey />
              </Tab.Pane>
              <Tab.Pane eventKey="aggregated-private-key">
                <AggregatedPrivateKey />
              </Tab.Pane>
              <Tab.Pane eventKey="private-key-conversion">
                <PrivateKeyConversion />
              </Tab.Pane>
              <Tab.Pane eventKey="public-key-conversion">
                <PublicKeyConversion />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default Dashboard;
