import React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
import { Container, Col, Row } from "reactstrap";

function ScreenResult(props: any) {
  const history = useHistory();

  // STATE VARIABLES
  const [probability, setProbability] = useState(0);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [ageValid, setAgeValid] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (props.user) {
      // REQUEST TO THE API
      const genderInfo = async () => {
        const data = await fetch(
          "https://api.genderize.io?name=" + props.user.firstname
        );
        const body = await data.json();
        props.addGender(body.gender, body.probability * 100);
        setGender(body.gender);
        setProbability(body.probability * 100);
      };
      genderInfo();

      // LOAD EVENTUAL AGE INFORMATION FROM REDUCER
      if (props.user.age) {
        setAge(props.user.age);
      }
    }
  }, []);

  // REDIRECTION TO WELCOME PAGE IF MISSING INFORMATION
  if (!props.user.firstname) {
    history.push("/");
  }

  // SECOND FORM VERIFICATIONS
  let submit = () => {
    console.log("clicksubmit");
    if (age) {
      props.addAge(age);
      setAgeValid(true);
    } else {
      setError("Please enter your age");
    }
  };

  // REDIRECTION IF VALID INFORMATION
  if (ageValid) {
    console.log("redirection");
    history.push("/summary");
  }

  return (
    <Container fluid>
      <Row>
        <div className="body">
          <h1>DISCOVER YOUR RESULTS</h1>
          <p className="intro">
            Please register your age to complete your profile
          </p>
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
            <p className="p2">
              {props.user.gender
                ? props.user.gender.toUpperCase()
                : gender.toUpperCase()}
            </p>
          </div>

          <div className="field">
            <p className="p1">PROBABILITY</p>
            <p className="p2">
              {props.user.proba ? props.user.proba : probability}%
            </p>
          </div>
          <div className="field">
            <p className="p1">AGE</p>
            <input
              className="Input"
              type="number"
              name="age"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="IN YEARS"
            />
          </div>
          <div className="Buttons-Bar">
            <button className="Button" onClick={() => history.push("/")}>
              BACK
            </button>
            <button className="Button" onClick={() => submit()}>
              NEXT
            </button>
          </div>
          <p className="error">{error}</p>
        </div>
      </Row>
    </Container>
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
