import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useDispatch, useSelector } from "react-redux";
import { setActiveStep, setOrderDetails } from "../../redux/commonSlice";

export default function PaymentForm() {
  const dispatch = useDispatch();
  const activeStep = useSelector((state) => state.common.orderDetails.step);
  const paymentDetails = useSelector(
    (state) => state.common.orderDetails.paymentDetails
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setActiveStep(activeStep + 1));
  };

  const handleBack = (e) => {
    e.preventDefault();
    dispatch(setActiveStep(activeStep - 1));
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <ValidatorForm onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextValidator
              value={paymentDetails.cardName}
              onChange={(e) => {
                dispatch(
                  setOrderDetails({
                    type: "paymentDetails",
                    field: "cardName",
                    value: e.target.value,
                  })
                );
              }}
              id="cardName"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
              validators={["required"]}
              errorMessages={["Please enter your card name"]}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextValidator
              value={paymentDetails.cardNumber}
              onChange={(e) => {
                dispatch(
                  setOrderDetails({
                    type: "paymentDetails",
                    field: "cardNumber",
                    value: e.target.value,
                  })
                );
              }}
              id="cardNumber"
              label="Card number"
              fullWidth
              autoComplete="cc-number"
              variant="standard"
              validators={["required", "isNumber"]}
              errorMessages={["Please enter your card number", "Number only!"]}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                disableMaskedInput
                className="expDate"
                id="expDate"
                label="Expiry date"
                fullWidth
                autoComplete="cc-exp"
                variant="standard"
                inputFormat="MM/DD/YYYY"
                value={paymentDetails.expDate}
                onChange={(e) => {
                  dispatch(
                    setOrderDetails({
                      type: "paymentDetails",
                      field: "expDate",
                      value: e.$d.toISOString(),
                    })
                  );
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextValidator
              value={paymentDetails.cvv}
              onChange={(e) => {
                dispatch(
                  setOrderDetails({
                    type: "paymentDetails",
                    field: "cvv",
                    value: e.target.value,
                  })
                );
              }}
              id="cvv"
              label="CVV"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
              helperText="Last three digits on signature strip"
              validators={[
                "required",
                "isNumber",
                "minStringLength:3",
                "maxStringLength:3",
              ]}
              errorMessages={[
                "Please enter your expiry date",
                "CVV is not valid!",
                "CVV is not valid!",
                "CVV is not valid!",
              ]}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
            Back
          </Button>
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
