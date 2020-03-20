import React from 'react';

import { Offline, Online } from 'react-detect-offline';
import { Row, Col, Image, Button } from 'react-bootstrap';

import avatar from '../images/puzzle.png';

import './Header.scss';

const Header = () => {
  const polling = {
    enabled: true,
    interval: 5000,
    timeout: 5000,
    url: 'https://ipv4.icanhazip.com'
  };

  return (
    <header>
      <div className="container-fluid">
        <div className="header-body">
          <Row>
            <Col md="auto">
              <div className="avatar">
                <Image src={avatar} className="avatar-img" />
              </div>
            </Col>
            <Col md="auto">
              <h1 className="header-title">Key Agreement for Ethereum</h1>
              <h6 className="header-version">{process.env.REACT_APP_VERSION}</h6>
            </Col>
            <Col className="network">
              <Row className="justify-content-end">
                <Online polling={polling}>
                  <Button variant="success">Internet</Button>
                </Online>
                <Offline polling={polling}>
                  <Button variant="danger">Offline</Button>
                </Offline>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </header>
  );
}

export default Header;
