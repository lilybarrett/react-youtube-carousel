import React, { StatelessComponent } from "react";
import { Container, Row, Col } from "reactstrap";
import { render } from "react-dom";
import YouTubeCarousel from "../";

const Example: StatelessComponent = () => {
    const videoIds = ["JzpOmdENVec", "Psv5dmrs3U0", "PbTjW-0VJN8"];
    // pass API key and playlist ID in here? or array of IDs?
    return (
        <Container>
            <Row>
                <Col xs={6}>
                    <h1>I am a YouTube carousel!</h1>
                    <Row>
                        <Col xs={12} sm={4}>
                            <YouTubeCarousel videoIds={videoIds}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

render(<Example />, document.querySelector("#root"));
