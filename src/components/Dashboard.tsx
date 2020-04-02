import React from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap';

import PoPProve from './PoP/PoPProve';
import PoPVerify from './PoP/PoPVerify';
import ECDHPublicKey from './ECDH/ECDHPublicKey';
import ECDHPrivateKey from './ECDH/ECDHPrivateKey';
import AggregatedPublicKey from './Aggregation/AggregatedPublicKey';
import AggregatedPrivateKey from './Aggregation/AggregatedPrivateKey';
import ConvertPrivateKey from './Tools/ConvertPrivateKey';
import ConvertPublicKey from './Tools/ConvertPublicKey';

import './Dashboard.scss';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Tab.Container defaultActiveKey="prove-keys">
        <Row>
          <Col md={2}>
            <Nav variant="pills" className="flex-column">
              <div className="section">
                <Nav.Item>
                  <Nav.Link className="title" eventKey="disabled" disabled={true}>
                    Proof of Possession
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="prove-keys">Prove Keys</Nav.Link>
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
              </div>
            </Nav>
          </Col>

          <Col md={10} className="web3-component">
            <Tab.Content>
              <Tab.Pane eventKey="prove-keys">
                <PoPProve />
              </Tab.Pane>
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
              <Tab.Pane eventKey="convert-private-key">
                <ConvertPrivateKey />
              </Tab.Pane>
              <Tab.Pane eventKey="convert-public-key">
                <ConvertPublicKey />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default Dashboard;
