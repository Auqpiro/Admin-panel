import { Accordion, Col, Container, Row } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

function Menu() {
  return (
    <Container>
      <Row>
        <Col className="col-md-3">
          <Link to={'/'}>
            <img src="https://u-connect.ru/local/templates/uconnect/assets/img/logo.png" alt="company logo" width="300em"/>
          </Link>
          <Accordion>
            <Accordion.Item>
              <Accordion.Header>CMDB</Accordion.Header>
              <Accordion.Body>
                <Link to={'/cmdb/servers'}>Серверы и ПК</Link>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col className="col-md-9">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default Menu;
