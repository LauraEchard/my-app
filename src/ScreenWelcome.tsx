import React from "react";
import { connect } from "react-redux";
import { useState } from "react";
import { Redirect } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Input, Button } from "reactstrap";

function ScreenWelcome(props: any) {
  // STATE VARIABLES
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState("");
  const [userValid, setUserValid] = useState(false);

  let submit = () => {
    // FIRST FORM VERIFICATIONS
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

  // REDIRECTION IF VALID INFORMATION
  if (userValid) {
    return <Redirect to="/screenresult" />;
  }

  return (
    <div>
      <h1>WELCOME SCREEN</h1>
      <Input
        onChange={(e) => setFirstname(e.target.value)}
        className="Input"
        placeholder="Firstname"
      />
      <Input
        onChange={(e) => setLastname(e.target.value)}
        className="Input"
        placeholder="Lastname"
      />
      <Button onClick={() => submit()}>SUBMIT</Button>
      <p>{error}</p>
    </div>
  );
}

// USE OF REDUX TO SHARE INFORMATION WITH OTHER COMPONENTS
function mapDispatchToProps(dispatch: any) {
  return {
    addUser: function (firstname: string, lastname: string) {
      dispatch({ type: "addUser", firstname: firstname, lastname: lastname });
    },
  };
}

export default connect(null, mapDispatchToProps)(ScreenWelcome);
