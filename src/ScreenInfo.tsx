import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
import { Container, Col, Row } from "reactstrap";
import logo from "./logo.svg";

function ScreenInfo(props: any) {
  const history = useHistory();

  // REDIRECTION TO WELCOME PAGE IF MISSING INFORMATION
  if (!props.user.firstname || !props.user.lastname || !props.user.age) {
    history.push("/");
  }

  return (
    <Container fluid>
      <Row>
        <div className="body">
          <h1>DISCOVER YOUR RESULTS</h1>
          <p className="intro">Your profile is now revealed!</p>
          <div className="field">
            <p className="p1">FIRSTNAME</p>
            <p className="p2">{props.user.firstname.toUpperCase()}</p>
          </div>
          <div className="field">
            <p className="p1">LASTNAME</p>
            <p className="p2">{props.user.lastname.toUpperCase()}</p>
          </div>
          <div className="field">
            <p className="p1">STAR TYPE</p>
            <p className="p2">{props.user.gender.toUpperCase()}</p>
          </div>
          <div className="field">
            <p className="p1">PROBABILITY</p>
            <p className="p2">{props.user.proba}%</p>
          </div>
          <div className="field">
            <p className="p1">AGE</p>
            <p className="p2">{props.user.age}</p>
          </div>
          <button className="Button" onClick={() => history.push("/results")}>
            BACK
          </button>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </Row>
    </Container>
  );
}

function mapStateToProps(state: any) {
  return { user: state.user };
}

export default connect(mapStateToProps, null)(ScreenInfo);
