import React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// STYLE
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "reactstrap";

// CONTEXTUAL COMPONENTS
import ThemedButton from "../contexts/themed-button";
import ThemedField from "../contexts/themed-field";
import ThemedBackground from "../contexts/themed-background";

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
    history.push("/info");
  }

  return (
    <Container fluid>
      <Row>
        <ThemedBackground>
          <h1>WHICH STAR ARE YOU?</h1>
          <p className="Intro">Let's find out about this great mystery</p>
          <div className="Field">
            <ThemedField>FIRSTNAME</ThemedField>
            <input
              onChange={(e) => setFirstname(e.target.value.toUpperCase())}
              className="Input"
              value={firstname}
              placeholder="JOHN"
              maxLength={20}
            />
          </div>
          <div className="Field">
            <ThemedField>LASTNAME</ThemedField>
            <input
              onChange={(e) => setLastname(e.target.value.toUpperCase())}
              className="Input"
              value={lastname}
              placeholder="DOE"
              maxLength={20}
            />
          </div>
          <button className="Button" onClick={() => submit()}>
            NEXT
          </button>
          <p className="Error"> {error} </p>
          <ThemedButton>MODE</ThemedButton>
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
    addUser: function (firstname: string, lastname: string) {
      dispatch({ type: "addUser", firstname: firstname, lastname: lastname });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenWelcome);
