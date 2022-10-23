import React, { Component, useEffect, useState } from "react";
import { loginImage, logo, googleImage } from "./assets";
import {
  Container,
  TextField,
  withStyles,
  Alert,
  LinearProgress,
  InputAdornment,
  IconButton,
  Input,
  InputLabel,
  FormControl,
  Grid,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core/";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Login = () => {
  const getCustomDesign = () => {
    return (
      <div style={webStyle.customDesign}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  };
  return (
    <div>
      <div style={webStyle.mainContainer}>
        <div>
          <img style={webStyle.loginImage} src={loginImage} />
        </div>
        <Grid container style={webStyle.rightSection}>
          <Grid item xs={12}>
            <div>
              <div style={webStyle.logoContainer}>
                <span>
                  <img src={logo} style={webStyle.logo} />
                </span>
                <span style={webStyle.companyText}>Skill Access</span>
              </div>
            </div>
          </Grid>

          <Grid item xs={12}>
            <p style={webStyle.gettingStartedText}>Getting Started</p>
            <span style={webStyle.createText}>
              Create an account to continue!
            </span>
          </Grid>

          <Grid item xs={12}>
            <div style={{ marginTop: "20px" }}>
              <InputFiled placeholder="Email" variant="filled" />
            </div>

            <div>
              <InputFiled
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {" "}
                      <IconButton
                        aria-label="toggle password visibility"
                        // onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                      >
                        {/* {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )} */}
                        <Visibility />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                placeholder="Passowrd"
                variant="filled"
              />
            </div>
            <div>
              <InputFiled
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {" "}
                      <IconButton
                        aria-label="toggle password visibility"
                        // onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                      >
                        {/* {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )} */}
                        <Visibility />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                placeholder="Confirm Passowrd"
                variant="filled"
              />
            </div>
          </Grid>

          <Grid item lg={12}>
            <div style={webStyle.checkboxContainer}>
              <p style={{ color: "#8F92A1" }}>
                <input type="checkbox" />
                <span style={{ marginLeft: "5px", fontSize: "12px" }}>
                  By creating an account, you agree to our{" "}
                  <span style={{ color: "#0052CC" }}>Term and Conditions</span>
                </span>
              </p>
            </div>
          </Grid>
          <Grid lg={12}>
            <div style={{ margin: "10px auto" }}>
              <Button
                style={{
                  width: "358px",
                  textTransform: "none",
                  backgroundColor: "#0052CC",
                }}
                variant="contained"
                color="primary"
              >
                Register
              </Button>
            </div>
          </Grid>
          <Grid lg={12}>OR</Grid>

          <Grid lg={12}>
            <div style={{ margin: "10px auto" }}>
              <Button
                startIcon={<img src={googleImage} height="20" width={"16"} />}
                style={{ width: "358px", textTransform: "none" }}
                variant="contained"
                color="default"
              >
                Continue with Google
              </Button>
            </div>
          </Grid>
          <Grid item lg={12}>
            <p style={{ fontSize: "13px", color: "#8F92A1" }}>
              Already have an account?{" "}
              <span style={{ color: "blue" }}> Sign in</span>
            </p>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const InputFiled = withStyles({
  root: {
    width: "358px",
    marginBottom: "5px",
    marginTop: "10px",
  },
})(TextField);

const FormControlCustom = withStyles({
  root: {
    marginBottom: "5px",
    marginTop: "20px",
    padding: "10px",
  },
})(FormControl);

const webStyle = {
  mainContainer: {
    display: "flex",
  },
  loginImage: {
    height: "100vh",
  },
  rightSection: {
    textAlign: "center",
    width: "100%",
    margin: "25px",
    padding: "50px",
  },
  logo: {
    width: "42px",
    height: "32",
  },
  companyText: {
    fontSize: "22px",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
  },
  gettingStartedText: {
    marginTop: "30px",
    marginBottom: "10px",
    fontSize: "22px",
  },
  createText: {
    marginLeft: "42px",
    color: "#8F92A1",
    fontSize: "14px",
  },
  agreeText: {
    marginLeft: "5px",
    color: "#8F92A1",
    fontSize: "14px",
    fontWeight: "400",
    textAlign: "left",
  },
  checkboxContainer: {
    marginTop: "10px",
  },
  blueText: {
    color: "#0052CC",
  },
};

export default Login;
