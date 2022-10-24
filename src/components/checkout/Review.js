import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { setActiveStep, setIdOrder } from "../../redux/commonSlice";
import { writeOrder } from "../../firebase/service";

export default function Review() {
  const dispatch = useDispatch();
  const activeStep = useSelector((state) => state.common.orderDetails.step);
  const uid = useSelector((state) => state.common.formUserInfo.uid);
  const { pendingCart, ...otherCart } = useSelector((state) => state.cart);
  const { step, id, shippingAddress, paymentDetails } = useSelector(
    (state) => state.common.orderDetails
  );

  const shippingAddressTrim = {};

  Object.keys(shippingAddress).forEach((item) => {
    shippingAddressTrim[item] = shippingAddress[item].trim();
  });

  const paymentDetailsTrim = {};

  Object.keys(paymentDetails).forEach((item) => {
    paymentDetailsTrim[item] = paymentDetails[item].trim();
  });

  const handleBack = (e) => {
    e.preventDefault();
    dispatch(setActiveStep(activeStep - 1));
  };

  const handlePlaceOrder = () => {
    const idOrder = Math.round(Math.random() * 10000000);
    writeOrder(uid, idOrder, {
      shippingAddress: shippingAddressTrim,
      paymentDetails: paymentDetailsTrim,
      cart: { ...otherCart },
      tracking: "ordered",
    });
    dispatch(setIdOrder(idOrder));
    dispatch(setActiveStep(activeStep + 1));
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {shippingAddress.firstName + " " + shippingAddress.lastName}
          </Typography>
          <Typography gutterBottom>
            {shippingAddress.address1 +
              ", " +
              shippingAddress.address2 +
              ", " +
              shippingAddress.city +
              ", " +
              shippingAddress.province +
              ", " +
              shippingAddress.zipCode +
              ", " +
              shippingAddress.country}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            <React.Fragment key="card-type">
              <Grid item xs={6}>
                <Typography gutterBottom>Card type</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Visa</Typography>
              </Grid>
            </React.Fragment>

            <React.Fragment key="card-holder">
              <Grid item xs={6}>
                <Typography gutterBottom>Card holder</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{paymentDetails.cardName}</Typography>
              </Grid>
            </React.Fragment>

            <React.Fragment key="card-number">
              <Grid item xs={6}>
                <Typography gutterBottom>Card number</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>
                  {paymentDetails.cardNumber}
                </Typography>
              </Grid>
            </React.Fragment>

            <React.Fragment key="exp-date">
              <Grid item xs={6}>
                <Typography gutterBottom>Expired Date</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>
                  {paymentDetails.expDate.split("T")[0]}
                </Typography>
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
        <Box
          sx={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
        >
          <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handlePlaceOrder}
            sx={{ mt: 3, ml: 1 }}
            className="btn_checkout"
            type="submit"
          >
            Place order
          </Button>
        </Box>
      </Grid>
    </React.Fragment>
  );
}
