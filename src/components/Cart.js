import React, { Component, useEffect, useState } from "react";
import {
  Card,
  CardTitle,
  CardBody,
  CardSubtitle,
  CardText,
  Button,
  Nav,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "reactstrap";
import { useCartContext } from "../providers/CartProvider";
import { Container, TextField, withStyles } from "@material-ui/core/";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { NavLink, useNavigate } from "react-router-dom";
// import {ArrowForwardIosIcon,ShoppingCartIcon} from '@material-ui/icons/';
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import HomeIcon from "@material-ui/icons/Home";
import WorkIcon from "@material-ui/icons/Work";

const Cart = () => {
  const { getNumberOfTodoItems, cart, addToCart, totalItems, deleteFromCart } =
    useCartContext();

  const cartItems = cart.filter((item) => item.quantity !== 0);
  const [totalAmount, setTotal] = useState(0);
  const [isAddressAdded, updateUserAddress] = useState(false);
  const [openAddressModal, toggleAddressModal] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [responseData, setResponse] = useState({});
  const [addressType, setAddressType] = useState("");

  const [isLoading, setLoading] = useState(false);

  const [showToast, setshowToast] = useState(false);
  const navigate = useNavigate();

  // const [items, setCartItems] = useState(cartItems);
  const UserInstruction = () => {
    const [inputValue, setInputValue] = useState("");
    return (
      <div className="d-flex" style={{ justifyContent: "space-between" }}>
        <input
          type="text"
          style={{ border: "none" }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Write instuctions for resturant"
        />
        {inputValue.length > 0 ? (
          <span style={{ color: "orange" }}>Save</span>
        ) : (
          <AddCircleOutlineOutlinedIcon style={{ color: "grey" }} />
        )}
      </div>
    );
  };

  const UserOfferContainer = () => {
    return (
      <>
        <h4>Offers & Benefits</h4>
        <div style={webStyle.itemsContainer}>
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <p>Apply Coupon</p>
            <span>
              <ArrowForwardIosIcon />
            </span>
          </div>
          {/* <span>No Coupon avaliable</span> */}
        </div>
      </>
    );
  };

  const BillContainer = (props) => {
    const { itemTotal } = props;
    const deliveryFee = 40;
    const taxes = itemTotal * 0.05;
    const toPay = itemTotal + deliveryFee + taxes;
    setTotal(toPay);
    return (
      <>
        <h4>Bill Details</h4>
        <div style={webStyle.BillContainer}>
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <p>Item Total</p>
            <p>&#x20a8; {itemTotal}</p>
          </div>
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <div>
              <p className="m-0">Delivery Fee | 1.9kms</p>
            </div>
            <div>
              <p className="m-0">&#x20a8; {deliveryFee.toFixed(2)}</p>
            </div>
          </div>
          <span>
            <p style={{ color: "grey" }}>
              This fee goes towards paying your Delivery Partner fairly
            </p>
          </span>
          <hr />
          <div>
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div>
                <p className="m-0">Delivery Tip</p>
              </div>
              <div>
                <p className="m-0" style={{ color: "orange" }}>
                  Add Tip
                </p>
              </div>
            </div>
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div>
                <p>Taxes and Charges</p>
              </div>
              <div>
                <p>&#x20a8; {taxes}</p>
              </div>
            </div>
          </div>
          <hr />
          <div>
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div>
                <p style={{ fontWeight: "bold" }}>To Pay</p>
              </div>
              <div>
                <p style={{ fontWeight: "bold" }}>&#x20a8; {toPay}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const itemTotal = () => {
    let total = 0;
    cartItems.map((item) => {
      total += item.quantity * item.price;
      return total;
    });

    return total;
  };

  const AddAddressModal = (args) => {
    const [houseNumber, setHouseNumber] = useState("");
    const [area, setArea] = useState("");
    const [mobile, setMobile] = useState("");
    const [directions, setDirections] = useState("");
    const [type, setType] = useState("");

    const saveAddress = () => {
      const address = `${houseNumber},${area}`;
      setUserAddress(address);
      toggleAddressModal(false);
      updateUserAddress(true);
      setAddressType(type);
    };

    return (
      <>
        <Modal isOpen={openAddressModal} {...args}>
          <ModalHeader>Add Address</ModalHeader>
          <ModalBody>
            <InputFiled
              type="text"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              placeholder="HOUSE/FLAT/BLOCL NO."
            />
            <InputFiled
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="APARTMENT/ROAD/AREA(OPTIONAL)"
            />
            <InputFiled
              type="number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile"
            />
            <InputFiled
              type="text"
              value={directions}
              onChange={(e) => setDirections(e.target.value)}
              placeholder="DIRECTIONS TO REACH(OPTIONAL)"
            />
            <p style={{ textTransform: "uppercase" }}>Save this address as</p>
            <Chip
              style={{ marginRight: "5px" }}
              avatar={<HomeIcon />}
              label="Home"
              onClick={() => setType("Home")}
            />
            <Chip
              style={{ marginRight: "5px" }}
              avatar={<WorkIcon />}
              label="Work"
              onClick={() => setType("Work")}
            />
            <Chip
              style={{ marginRight: "5px" }}
              avatar={<LocationOnIcon />}
              label="Other"
              onClick={() => setType("Other")}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => saveAddress()}>
              Save
            </Button>{" "}
            <Button color="danger" onClick={() => toggleAddressModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  };

  const AddAddressComponent = () => {
    return (
      <div>
        {openAddressModal ? <AddAddressModal /> : ""}

        <div>
          <div
            className="d-flex p-2 justify-content-center"
            // style={{ justifyContent: "space-between" }}
          >
            <div>
              <LocationOnIcon
                style={{
                  fontSize: "30px",
                  color: "orange",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              />
            </div>
            <div>
              <p style={{ fontWeight: "bold" }}>You are in a new location</p>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={() => toggleAddressModal(!openAddressModal)}
              className="m-2"
              color="danger"
            >
              Add Address to Proceed
            </Button>
          </div>
        </div>
      </div>
    );
  };
  const AddedAddressComponent = () => {
    const handleRazorPay = async (id, amount) => {
      const result = await displayRaozrPay();
      if (!result) {
        alert("Something went wrong");
        return;
      }

      const options = {
        key: "rzp_test_gOwkoSR9uUl3VD", // Enter the Key ID generated from the Dashboard
        amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Pizzeria",
        description: "Test Transaction",
        image:
          "https://storage.googleapis.com/smartqprdnz_pub/im/ci/compassevents/vector-italian-pizza-horizontal-banners.jpg",
        order_id: id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: (response) => {
          setshowToast(true);
          navigate("/orderSuccess");
        },

        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        // prefill: {
        //   name: "Gaurav Kumar",
        //   email: "gaurav.kumar@example.com",
        //   contact: "9999999999",
        // },
      };
      const _window = window;
      const rzp1 = new _window.Razorpay(options);
      rzp1.on("payment.failed", (response) => {
        //   alert(response.error.code);
        //   alert(response.error.description);
        //   alert(response.error.source);
        //   alert(response.error.step);
        //   alert(response.error.reason);
        //   alert(response.error.metadata.order_id);
        //   alert(response.error.metadata.payment_id);
      });
      rzp1.open();
    };

    const displayRaozrPay = async () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(script);
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
      });
    };

    const createOrder = () => {
      setLoading(true);
      const data = {
        amount: totalAmount * 100,
      };
      fetch(
        "https://demoerceappl-728nrjjby-anujvdev2020.vercel.app/createOrder",
        {
          // Adding method type
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Adding body or contents to send
          body: JSON.stringify(data),

          // Adding headers to the request
        }
      )
        // Converting to JSON
        .then((response) => response.json())

        // Displaying results to console
        .then((json) => {
          setResponse(json);
          setLoading(false);
          handleRazorPay(json.id, json.amount);
          console.log("IDDDD", json.id);
        });
    };
    return (
      <div>
        <div>
          <div
            className="d-flex p-2"
            style={{ justifyContent: "space-between" }}
          >
            <div>
              <h5 className="m-0">Deliver to {addressType} | 40 MINS</h5>
              {isAddressAdded ? (
                <p style={{ color: "grey" }}>{userAddress}</p>
              ) : (
                <p style={{ color: "red" }}>Add Address</p>
              )}
            </div>
            <div>
              <LocationOnIcon
                style={{
                  fontSize: "30px",
                  color: "orange",
                  cursor: "pointer",
                  marginRight: "50px",
                }}
              />
            </div>
          </div>
          <hr />
        </div>

        <div>
          <div
            className="d-flex p-2"
            style={{ justifyContent: "space-between" }}
          >
            <div>
              <h5>&#x20a8; {totalAmount}</h5>
              <a
                style={{ color: "green", textDecoration: "none" }}
                href="#bill"
              >
                View Detailed Bill
              </a>
            </div>
            <div>
              <Button
                className="m-2"
                color="success"
                onClick={() => createOrder()}
              >
                Proceed To Pay
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Drawer = () => {
    return (
      <>
        <div style={webStyle.drawer}>
          {isAddressAdded ? <AddedAddressComponent /> : <AddAddressComponent />}
        </div>
      </>
    );
  };

  return (
    <Container>
      {showToast ? (
        <Alert severity="success" color="info">
          This is a success alert — check it out!
        </Alert>
      ) : (
        ""
      )}
      {isLoading ? (
        <Backdrop style={{ zIndex: "1200", color: "#fff" }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        ""
      )}

      <div style={webStyle.itemsContainer}>
        {getNumberOfTodoItems() > 0 ? (
          <React.Fragment>
            {/* <div className="d-flex">
              <div className="flex-2" style={{ flex: 2 }}>
                <p>Items</p>
              </div>
              <div style={{ flex: 1 }}>
                <p>Qtn</p>
              </div>
              <div style={{ flex: 1 }}>
                <p>Sub Total</p>
              </div>
            </div> */}

            {cartItems.map((item) => (
              <React.Fragment key={item.id}>
                <div
                  className="d-flex align-items-self-end"
                  style={{
                    margin: "5px",
                    padding: "5px",
                    alignItems: "self-end",
                  }}
                >
                  <div className="flex-2" style={{ flex: 2 }}>
                    <div className="d-flex align-items-flex-start">
                      {item.isVeg ? (
                        <img
                          src="https://i.pinimg.com/736x/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.jpg"
                          height={"20px"}
                          width={"20px"}
                        />
                      ) : (
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlOCcP71LUNEoiPyjNDAn648EuPhnFcJp5UVt2JUg4Ng&s"
                          height={"20px"}
                          width={"20px"}
                        />
                      )}

                      <p className="ml-2" style={{ marginLeft: "15px" }}>
                        {item.foodname}
                      </p>
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div>
                      <div className="d-flex justify-content-center align-items-baseline">
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
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p>&#x20a8; {item.quantity * item.price}</p>
                  </div>
                </div>
              </React.Fragment>
            ))}
            <hr />
            <UserInstruction />
          </React.Fragment>
        ) : (
          <div className="m-2 text-center">
            <ShoppingCartIcon
              style={{
                marginTop: "14px",
                color: "blue",
                height: "100px",
                width: "100px",
              }}
            />
            <h3>Good Food is Always Cooking</h3>
            <p style={{ color: "grey" }}>
              Your Cart is empty.Add something from the menu
            </p>
            <NavLink to="/">
              <Button
                className="m-2"
                color="primary"
                outline
                onClick={() => {}}
              >
                MENU
              </Button>
            </NavLink>
          </div>
        )}
      </div>

      {getNumberOfTodoItems() > 0 && <UserOfferContainer />}
      <div id="bill">
        {getNumberOfTodoItems() > 0 && (
          <BillContainer itemTotal={itemTotal()} />
        )}
      </div>
      {getNumberOfTodoItems() > 0 && <Drawer />}
    </Container>
  );
};

const InputFiled = withStyles({
  root: {
    width: "100%",
    marginBottom: "15px",
  },
})(TextField);

const webStyle = {
  itemsContainer: {
    padding: "20px",
    borderRadius: "9px",
    background: "white",
    marginBottom: "30px",
    marginTop: "15px",
    boxShadow: "1px 1px 15px 0px grey",
  },
  BillContainer: {
    padding: "20px",
    borderRadius: "9px",
    background: "white",
    marginBottom: "200px",
    marginTop: "15px",
    boxShadow: "1px 1px 15px 0px grey",
  },
  drawer: {
    position: "fixed",
    width: "100%",
    height: "auto",
    bottom: "0",
    right: "0",
    left: "0",
    color: "black",
    background: "white",
    borderTopRightRadius: "8px",
    boxShadow: " 2px 2px 3px #999",
    zIndex: "3",
    borderTopLeftRadius: "8px",
  },
  backdrop: {
    zIndex: 1300,
    color: "#fff",
  },
};
export default Cart;
