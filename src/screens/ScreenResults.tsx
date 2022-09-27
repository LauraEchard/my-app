import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

// STYLE
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "reactstrap";

// CONTEXTUAL COMPONENTS
import ThemedField from "../contexts/themed-field";
import ThemedBackground from "../contexts/themed-background";

function ScreenResults(props: any) {
  const history = useHistory();

  // REDIRECTION TO WELCOME PAGE IF MISSING INFORMATION
  if (!props.user.firstname || !props.user.lastname || !props.user.age) {
    history.push("/");
  }

  // CUSTOMED MESSAGE
  let message;
  let gifUrl;
  if (props.user.gender === "MEGASTAR" && props.user.firstname === "CORENTIN") {
    message = (
      <p className="Corentin">
        Hello Corentin, merci d'avoir testé l'appli ! J'espère que tu apprécies
        ce magnifique gif :) À bientôt pour en discuter !
      </p>
    );
    gifUrl = "https://media.giphy.com/media/KBUOA871uShQ6zPHDf/giphy.gif";
  } else if (props.user.gender === "MEGASTAR") {
    message = <p className="Intro">Congratulations, now you know</p>;
    gifUrl = "https://media.giphy.com/media/KBUOA871uShQ6zPHDf/giphy.gif";
  } else if (props.user.gender === "GIGASTAR") {
    message = <p className="Intro">Congratulations, now you know</p>;
    gifUrl = "https://media.giphy.com/media/26u49pk6wiIkj2tEY/giphy.gif";
  }

  return (
    <Container fluid>
      <Row>
        <ThemedBackground>
          <h1 className="Title">YOU ARE A {props.user.gender}!</h1>
          {message}
          <div className="Field">
            <ThemedField>FIRSTNAME</ThemedField>
            <p className="p2">{props.user.firstname.toUpperCase()}</p>
          </div>
          <div className="Field">
            <ThemedField>LASTNAME</ThemedField>
            <p className="p2">{props.user.lastname.toUpperCase()}</p>
          </div>
          <div className="Field">
            <ThemedField>STAR TYPE</ThemedField>
            <p className="p2">{props.user.gender.toUpperCase()}</p>
          </div>
          <div className="Field">
            <ThemedField>PROBABILITY</ThemedField>
            <p className="p2">{props.user.proba}%</p>
          </div>
          <div className="Field">
            <ThemedField>AGE</ThemedField>
            <p className="p2">{props.user.age}</p>
          </div>
          <button className="Button" onClick={() => history.push("/info")}>
            BACK
          </button>
          <img src={gifUrl} alt="my-gif" className="Gif"></img>
        </ThemedBackground>
      </Row>
    </Container>
  );
}

function mapStateToProps(state: any) {
  return { user: state.user };
}

export default connect(mapStateToProps, null)(ScreenResults);
