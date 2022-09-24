import React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Input, Button } from "reactstrap";

function ScreenResult(props: any) {
  // STATE VARIABLES
  const [probability, setProbability] = useState(0);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [ageValid, setAgeValid] = useState(false);

  // REQUEST TO THE API
  useEffect(() => {
    if (props.user.firstname) {
      const genderInfo = async () => {
        const data = await fetch(
          "https://api.genderize.io?name=" + props.user.firstname
        );
        const body = await data.json();
        console.log(body);
        props.addGender(body.gender, body.probability * 100);
        setGender(body.gender);
        setProbability(body.probability * 100);
      };
      genderInfo();
    }
  }, []);

  // REDIRECTION TO WELCOME PAGE IF MISSING INFORMATION
  if (!props.user.firstname || !props.user.lastname) {
    return <Redirect to="/" />;
  }

  // SECOND FORM VERIFICATIONS
  let submit = () => {
    console.log("clicksubmit");
    props.addAge(age);
    setAgeValid(true);
  };

  // REDIRECTION IF VALID INFORMATION
  if (ageValid) {
    console.log("redirection");
    return <Redirect to="/screeninfo" />;
  }

  return (
    <div>
      RESULT SCREEN
      <p>Your first name is : {props.user.firstname}</p>
      <p>Your last name is : {props.user.lastname}</p>
      <p>Gender : {gender}</p>
      <p>Proba : {probability}</p>
      <Input
        onChange={(e) => setAge(e.target.value)}
        className="Input"
        placeholder="Age"
      />
      <Button onClick={() => submit()}>SUBMIT</Button>
    </div>
  );
}

// USE OF REDUX TO SHARE INFORMATION WITH OTHER COMPONENTS
function mapStateToProps(state: any) {
  return { user: state.user };
}

function mapDispatchToProps(dispatch: any) {
  return {
    addAge: function (age: string) {
      dispatch({ type: "addAge", age: age });
    },
    addGender: function (gender: string, proba: number) {
      dispatch({ type: "addGender", gender: gender, proba: proba });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenResult);
