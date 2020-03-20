import React from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap';

import ECDHPublicKey from './ECDH/ECDHPublicKey';
import ECDHPrivateKey from './ECDH/ECDHPrivateKey';
import AggregatedPublicKey from './Aggregation/AggregatedPublicKey';
import AggregatedPrivateKey from './Aggregation/AggregatedPrivateKey';

import './Dashboard.scss';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Tab.Container defaultActiveKey="ecdh-public-key">
        <Row>
          <Col md={2}>

            <Nav variant="pills" className="flex-column">
              <div className="section">
                <Nav.Item>
                  <Nav.Link className="title" eventKey="disabled" disabled>
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
                  <Nav.Link className="title" eventKey="disabled" disabled>
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
            </Nav>
          </Col>

          <Col md={10} className="web3-component">
            <Tab.Content>
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
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default Dashboard;
