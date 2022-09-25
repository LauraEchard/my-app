import React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "reactstrap";

import { ThemeContext, themes } from "./theme-context";
import ThemedButton from "./themed-button";

function ScreenWelcome(props: any) {
  const history = useHistory();

  // STATE VARIABLES
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState("");
  const [userValid, setUserValid] = useState(false);

  // LOAD EXISTING INFORMATION FROM REDUX
  useEffect(() => {
    if (props.user) {
      setFirstname(props.user.firstname);
      setLastname(props.user.lastname);
    }
  }, [props.user.firstname]);

  // FORM VERIFICATIONS
  let submit = () => {
    let regex = "[a-zA-Z]";
    if (!firstname && !lastname) {
      setError("Please register your firstname and lastname");
    } else if (!firstname) {
      setError("Please register your firstname");
    } else if (!lastname) {
      setError("Please registrer your lastname");
    } else if (!firstname.match(regex) || !lastname.match(regex)) {
      setError("Please register your information at an alphabetic format");
    } else {
      props.addUser(firstname, lastname);
      setUserValid(true);
    }
  };

  // REDIRECTION ONLY IF VALID INFORMATION
  if (userValid) {
    history.push("/results");
  }

  return (
    <Container fluid>
      <Row>
        <div className="body">
          <h1>WHICH STAR ARE YOU?</h1>
          <p className="intro">
            Please register your information to start this journey
          </p>
          <div className="field">
            <p className="p1">FIRSTNAME</p>
            <input
              onChange={(e) => setFirstname(e.target.value.toUpperCase())}
              className="Input"
              value={firstname}
              placeholder="JOHN"
            />
          </div>
          <div className="field">
            <p className="p1">LASTNAME</p>
            <input
              onChange={(e) => setLastname(e.target.value.toUpperCase())}
              className="Input"
              value={lastname}
              placeholder="DOE"
            />
          </div>
          <button className="Button" onClick={() => submit()}>
            NEXT
          </button>
          <p className="error"> {error} </p>;
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
    addUser: function (firstname: string, lastname: string) {
      dispatch({ type: "addUser", firstname: firstname, lastname: lastname });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenWelcome);
