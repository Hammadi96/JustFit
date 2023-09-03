import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

import { saveShippingAddress } from "../slices/cartSlice";

const cities = ["بنغازي", "طرابلس", "مصراتة"];
const benghaziAreas = ["الماجوري", "الكيش", "الفويهات"];

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [country, setCountry] = useState(shippingAddress.country || "");
  const [area, setArea] = useState(shippingAddress.area || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (city === "") {
      // Display an error message or handle the case where no city is selected
      return;
    }
    dispatch(saveShippingAddress({ address, city, country, area }));
    navigate("/placeorder");
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    if (selectedCity !== "بنغازي") {
      setArea(""); // Reset the selected area when changing the city
    }
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />

      <h1>العنوان</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="address">
          <Form.Label>الوصف</Form.Label>
          <Form.Control
            type="text"
            placeholder="ادخل الوصف"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="city">
          <Form.Label>المدينة</Form.Label>
          <Form.Control
            as="select"
            value={city}
            required
            onChange={handleCityChange}
          >
            <option value="">اختار المدينة</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {city === "بنغازي" && (
          <Form.Group className="my-2" controlId="area">
            <Form.Label>المنطقة</Form.Label>
            <Form.Control
              as="select"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            >
              <option value="">اختر المنطقة</option>
              {benghaziAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        )}

        <Form.Group className="my-2" controlId="country">
          <Form.Label>الدولة</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          تابع
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
