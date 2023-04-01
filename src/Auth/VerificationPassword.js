import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

function VerificationPassword() {
  return (
    <Container>
      <Row>
        <Col md="5" className="mx-auto">
          <Card className="px-4 pt-3 rounded-4 mt-5">
            <i className="bi bi-check-circle-fill text-success fs-1 text-center"></i>
            <h4 className="text-center" style={{ fontFamily: "Roboto Slab" }}>
              Verification token sent successfully
            </h4>
            <p className="text-secondary text-center">
              Please check your email
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default VerificationPassword;
