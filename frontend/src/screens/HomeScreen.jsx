import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { groupBy } from "lodash";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  // Group products by category
  const productsByCategory = groupBy(products, "category");

  // Extract one product from each category
  const productsToShow = Object.keys(productsByCategory).map(
    (category) => productsByCategory[category][0]
  );

  const getProductsByCategory = (category) => {
    if (products) {
      return products.filter((product) => product.category === category);
    }
    return [];
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Message variant={"danger"}>
        {error?.data?.message || error.error}
      </Message>
    );
  }

  return (
    <div style={{ direction: "rtl" }}>
      <>
        <h1>عروض</h1>
        <Slider
          arrows={true}
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={2000}
          style={{ backgroundColor: "#85b167" }}
        >
          {productsToShow.map((product) => (
            <div key={product._id}>
              <Product product={product}></Product>
            </div>
          ))}
        </Slider>

        <h1 id="Butter">الزبدة</h1>
        <Row>
          {getProductsByCategory("Butter").map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product}></Product>
            </Col>
          ))}
        </Row>

        <h1 id="Chocolate">الشوكولاته</h1>
        <Row>
          {getProductsByCategory("Chocolate").map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product}></Product>
            </Col>
          ))}
        </Row>

        <h1 id="Cookies">كوكيز</h1>
        <Row>
          {getProductsByCategory("Cookies").map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product}></Product>
            </Col>
          ))}
        </Row>

        <h1 id="Granola">قرانولا</h1>
        <Row>
          {getProductsByCategory("Granola").map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product}></Product>
            </Col>
          ))}
        </Row>
      </>
    </div>
  );
};

export default HomeScreen;
