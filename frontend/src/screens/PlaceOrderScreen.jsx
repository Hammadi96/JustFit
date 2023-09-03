import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const [note, setNote] = useState("");

  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const orderItems = cart.cartItems.map(
        (item) => `${item.name} - الكمية: ${item.qty} - السعر: $${item.price}`
      );
      const orderDetails = {
        shippingAddress: cart.shippingAddress,
        itemsPrice: cart.itemsPrice,
        totalPrice: cart.totalPrice,
        orderItems: cart.cartItems,
      };

      const message = generateOrderMessage(orderDetails, orderItems);

      const phoneNumber = "+218919695999";
      const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}`;

      window.open(url, "_blank");

      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        itemsPrice: cart.itemsPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };
  const generateOrderMessage = (orderDetails, orderItems) => {
    const shippingAddress = orderDetails.shippingAddress;
    const itemsPrice = orderDetails.itemsPrice;

    const user = `الزبون :
    ${userInfo.name}`;

    const address = `العنوان:
  ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.area}, ${shippingAddress.country}`;

    const items = `الاصناف:
  ${orderItems.join("\n")}`;

    const price = `اجمالي السعر: $${itemsPrice}`;

    const customerNote = `ملاحظة الزبون : ${note}`;

    const message = `تم انشاء الطلب بنجاح.
    
    ${user}

  ${address}
  
  ${items}
  
  ${price}
  ${customerNote}
    
  `;

    return message;
  };

  // Rest of your code...
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>تفاصيل الطلب</h2>
              <p>
                <strong>العنوان:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city} ,
                {cart.shippingAddress.area}, {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>الاصناف</h2>
              {cart.cartItems.length === 0 ? (
                <Message>سلة تسوقك فارغه</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          ${item.qty * item.price}= ${item.price}X{item.qty}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>ملخص الطلب</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>اجمالي السعر</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Note</Col>
                  <Col>
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && (
                  <Message variant="danger">{error.data.message}</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  ارسل الطلب
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
