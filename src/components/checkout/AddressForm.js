import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { setActiveStep, setOrderDetails } from "../../redux/commonSlice";
import { useDispatch, useSelector } from "react-redux";

export default function AddressForm() {
  const dispatch = useDispatch();
  const activeStep = useSelector((state) => state.common.orderDetails.step);
  const shippingAddress = useSelector(
    (state) => state.common.orderDetails.shippingAddress
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setActiveStep(activeStep + 1));
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <ValidatorForm onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextValidator
              value={shippingAddress.firstName}
              onChange={(e) => {
                dispatch(
                  setOrderDetails({
                    type: "shippingAddress",
                    field: "firstName",
                    value: e.target.value,
                  })
                );
              }}
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              validators={["required"]}
              errorMessages={["Please enter your first name"]}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextValidator
              value={shippingAddress.lastName}
              onChange={(e) => {
                dispatch(
                  setOrderDetails({
                    type: "shippingAddress",
                    field: "lastName",
                    value: e.target.value,
                  })
                );
              }}
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              validators={["required"]}
              errorMessages={["Please enter your first name"]}
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              value={shippingAddress.address1}
              onChange={(e) => {
                dispatch(
                  setOrderDetails({
                    type: "shippingAddress",
                    field: "address1",
                    value: e.target.value,
                  })
                );
              }}
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              validators={["required"]}
              errorMessages={["Please enter your address line 1"]}
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              value={shippingAddress.address2}
              onChange={(e) => {
                dispatch(
                  setOrderDetails({
                    type: "shippingAddress",
                    field: "address2",
                    value: e.target.value,
                  })
                );
              }}
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
              validators={["required"]}
              errorMessages={["Please enter your address line 2"]}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextValidator
              value={shippingAddress.city}
              onChange={(e) => {
                dispatch(
                  setOrderDetails({
                    type: "shippingAddress",
                    field: "city",
                    value: e.target.value,
                  })
                );
              }}
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              validators={["required"]}
              errorMessages={["Please enter your city"]}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextValidator
              value={shippingAddress.province}
              onChange={(e) => {
                dispatch(
                  setOrderDetails({
                    type: "shippingAddress",
                    field: "province",
                    value: e.target.value,
                  })
                );
              }}
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
              validators={["required"]}
              errorMessages={["Please enter your state"]}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextValidator
              value={shippingAddress.zipCode}
              onChange={(e) => {
                dispatch(
                  setOrderDetails({
                    type: "shippingAddress",
                    field: "zipCode",
                    value: e.target.value,
                  })
                );
              }}
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              validators={["required", "isNumber"]}
              errorMessages={["Please enter your zip-code", "Number only!"]}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextValidator
              value={shippingAddress.country}
              onChange={(e) => {
                dispatch(
                  setOrderDetails({
                    type: "shippingAddress",
                    field: "country",
                    value: e.target.value,
                  })
                );
              }}
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              validators={["required"]}
              errorMessages={["Please enter your country"]}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={() => {}}
            sx={{ mt: 3, ml: 1 }}
            className="btn_checkout"
            type="submit"
          >
            Next
          </Button>
        </Box>
      </ValidatorForm>
    </React.Fragment>
  );
}
