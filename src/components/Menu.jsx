import React, { Component, useState } from "react";
import {
  Card,
  CardTitle,
  CardBody,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import { useCartContext } from "../providers/CartProvider";
import { useEffect } from "react";
import Slider from "react-slick";
import { Container } from "@material-ui/core/";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { NavLink } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Menu = () => {
  const [imgLoaded, setLoaded] = useState(false);
  const { getNumberOfTodoItems, cart, addToCart, totalItems, deleteFromCart } =
    useCartContext();

  const settings = {
    dots: false,
    adaptiveHeight: true,
    swipeToSlide: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    setLoaded(!imgLoaded);
  }, []);

  return (
    <div>
      {imgLoaded ? (
        <img
          style={webStyles.bannerStyle}
          src="https://storage.googleapis.com/smartqprdnz_pub/im/ci/compassevents/vector-italian-pizza-horizontal-banners.jpg"
        />
      ) : (
        <SkeletonTheme
          borderRadius={10}
          baseColor="#c4bbbb"
          highlightColor="#f9f0f0"
        >
          <Skeleton height={400}></Skeleton>
        </SkeletonTheme>
      )}

      <Container style={{ padding: "30px" }}>
        {getNumberOfTodoItems() !== 0 && (
          <NavLink style={webStyles.cartBtn} to="/cart">
            <ShoppingCartIcon style={{ marginTop: "14px" }} />
          </NavLink>
        )}

        <h2> Favourites</h2>
        {imgLoaded && cart.length > 0 ? (
          <Slider {...settings}>
            {cart.length > 0
              ? cart.map((item) => (
                  <React.Fragment key={item.id}>
                    <Card
                      // color="primary"
                      outline
                      style={{
                        width: "18rem",
                        margin: "10px",
                        boxShadow: "1px 1px 15px 0px grey",
                        borderRadius: "1rem",
                      }}
                    >
                      <img alt="Sample" src={item.image} />
                      <CardBody>
                        <CardTitle tag="h5">{item.foodname}</CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                          {item.price} Rs
                        </CardSubtitle>
                        <CardText>
                          Some quick example text to build on the card title
                        </CardText>
                        {item.quantity > 0 ? (
                          <div className="d-flex  align-items-baseline">
                            <Button
                              className="m-2"
                              color="primary"
                              outline
                              onClick={() => addToCart(item.id)}
                            >
                              +
                            </Button>
                            <p>{item.quantity}</p>
                            <Button
                              className="m-2"
                              color="danger"
                              outline
                              onClick={() => deleteFromCart(item.id)}
                            >
                              -
                            </Button>
                          </div>
                        ) : (
                          <Button
                            color="primary"
                            outline
                            onClick={() => addToCart(item.id)}
                          >
                            ADD
                          </Button>
                        )}
                      </CardBody>
                    </Card>
                  </React.Fragment>
                ))
              : ""}

            {}
          </Slider>
        ) : (
          <SkeletonTheme
            borderRadius={10}
            baseColor="#c4bbbb"
            highlightColor="#f9f0f0"
          >
            <Skeleton height={400}></Skeleton>
          </SkeletonTheme>
        )}
      </Container>
    </div>
  );
};

const webStyles = {
  bannerStyle: {
    height: "100%",
    maxWidth: "100%",
  },
  cartBtn: {
    position: "fixed",
    width: "50px",
    height: "50px",
    bottom: "40px",
    right: "15px",
    backgroundColor: "orange",
    color: "#FFF",
    borderRadius: "50px",
    textAlign: "center",
    boxShadow: " 2px 2px 3px #999",
    zIndex: "3",
  },
};

export default Menu;
