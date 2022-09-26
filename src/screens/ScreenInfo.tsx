import React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// STYLE
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "reactstrap";

// CONTEXTUAL COMPONENTS
import ThemedField from "../contexts/themed-field";
import ThemedBackground from "../contexts/themed-background";

function ScreenInfo(props: any) {
  const history = useHistory();

  // STATE VARIABLES
  const [probability, setProbability] = useState(0);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [ageValid, setAgeValid] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (props.user) {
      // REQUEST TO THE API & COMMUNICATION TO REDUCER
      const genderInfo = async () => {
        const data = await fetch(
          "https://api.genderize.io?name=" + props.user.firstname
        );
        const body = await data.json();
        if (!body.gender || !body.probability) {
          setError("Sorry, there was an error with your research");
        }
        let starType = "";
        if (body.gender === "female") {
          starType = "GIGASTAR";
        } else if (body.gender === "male") {
          starType = "MEGASTAR";
        }

        props.addGender(starType, body.probability * 100);
        setGender(starType);
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
    if (age) {
      props.addAge(age);
      setAgeValid(true);
    } else {
      setError("Please enter your age");
    }
  };

  // REDIRECTION IF VALID INFORMATION
  if (ageValid) {
    history.push("/results");
  }

  return (
    <Container fluid>
      <Row>
        <ThemedBackground>
          <h1>ALMOST THERE!</h1>
          <p className="Intro">
            Please register your age to complete your profile
          </p>
          <div className="Field">
            <ThemedField>FIRSTNAME</ThemedField>
            <p className="p2">{props.user.firstname}</p>
          </div>
          <div className="Field">
            <ThemedField>LASTNAME</ThemedField>
            <p className="p2">{props.user.lastname}</p>
          </div>
          <div className="Field">
            <ThemedField>STAR TYPE</ThemedField>
            <p className="p2">
              {props.user.gender
                ? props.user.gender.toUpperCase()
                : gender.toUpperCase()}
            </p>
          </div>

          <div className="Field">
            <ThemedField>PROBABILITY</ThemedField>
            <p className="p2">
              {props.user.proba ? props.user.proba : probability}%
            </p>
          </div>
          <div className="Field">
            <ThemedField>AGE</ThemedField>
            <input
              className="Input"
              type="number"
              name="age"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="IN YEARS"
              max={999}
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
          <p className="Error">{error}</p>
        </ThemedBackground>
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

export default connect(mapStateToProps, mapDispatchToProps)(ScreenInfo);
