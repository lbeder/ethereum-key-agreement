import React from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap';

import SharedPublicKey from './SharedPublicKey';
import SharedPrivateKey from './SharedPrivateKey';

import './Dashboard.scss';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Tab.Container defaultActiveKey="public-key">
        <Row>
          <Col md={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="public-key">Shared Public Key</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="private-key">Shared Private Key</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md={10} className="web3-component">
            <Tab.Content>
              <Tab.Pane eventKey="public-key">
                <SharedPublicKey />
              </Tab.Pane>
              <Tab.Pane eventKey="private-key">
                <SharedPrivateKey />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default Dashboard;
