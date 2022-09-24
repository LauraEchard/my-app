import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ScreenInfo(props: any) {
  // REDIRECTION TO WELCOME PAGE IF MISSING INFORMATION
  if (!props.user.firstname || !props.user.lastname || !props.user.age) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <p>INFO SCREEN </p>
      <p>Your first name is : {props.user.firstname}</p>
      <p>Your last name is : {props.user.lastname}</p>
      <p>Your age is : {props.user.age}</p>
      <p>Your gender is : {props.user.gender}</p>
      <p>Your proba is : {props.user.proba}</p>
    </div>
  );
}

function mapStateToProps(state: any) {
  return { user: state.user };
}

export default connect(mapStateToProps, null)(ScreenInfo);
