import { Button, Col, Image, Row } from 'react-bootstrap';
import { Offline, Online } from 'react-detect-offline';
import ReactTooltip from 'react-tooltip';
import puzzle from '../images/puzzle.png';
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
                <Image src={puzzle} className="avatar-img" />
              </div>
            </Col>
            <Col md="auto">
              <h1 className="header-title">Key Agreement Protocols for Ethereum</h1>
              <h6 className="header-version">{process.env.REACT_APP_VERSION}</h6>
            </Col>
            <Col className="network">
              <Row className="justify-content-end">
                <Online polling={polling}>
                  <Button
                    variant="success"
                    data-place="left"
                    data-tip="Connected to the internet. We recommend running this tool in offline mode instead"
                  >
                    Online
                  </Button>
                </Online>

                <Offline polling={polling}>
                  <Button
                    variant="danger"
                    data-place="left"
                    data-tip="Not connected to the internet. This is the recommended way to run this tool"
                  >
                    Offline
                  </Button>
                </Offline>

                <ReactTooltip />
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </header>
  );
};

export default Header;
