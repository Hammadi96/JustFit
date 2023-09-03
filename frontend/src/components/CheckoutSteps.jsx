import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>تسجيل الدخول</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>تسجيل الدخول</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>العنوان</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>العنوان</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>ارسال الطلب</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>ارسال الطلب</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
