import React from 'react';
import { InputGroup, Button, FormControl, Container, Row, Col } from 'react-bootstrap';
import Result from './result';
import './main.css';

class Main extends React.Component {
    constructor() {
        super();
        this.analyze = this.analyze.bind(this);
        this.state = { text: "", result: [], showResults: false }
    }

    componentDidMount() {
        setInterval(() => {
            this.result();
        }, 5000);
    }

    analyze() {
        fetch(`/analyze`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                text: this.state.text
            })
        })
        .then((res) => {
        })
        .catch((err) => {
            console.log(err);
        });
    }

    result() {
        fetch(`/result`, {
            method: "GET"
        })
        .then((res) => {
            return res.json();
        })
        .then(resJson => {
            this.setState({ result: resJson, showResults: true});
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        return(
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={{ span: 8}}>
                        <InputGroup className="input">
                            <InputGroup.Prepend>
                                <InputGroup.Text> Enter your text here: </InputGroup.Text>
                                <FormControl as="textarea" className="form" aria-label="analyze-text" value={this.state.text} onChange={e => this.setState({ text: e.target.value})} />
                            </InputGroup.Prepend>
                        </InputGroup>
                        <Button type="button" id="analyze" onClick={this.analyze} variant="dark" block>Analyze</Button>
                    </Col>
                </Row>
                <p></p>
                <Row>
                    <Col md={{ span: 4, offset: 4}}>
                    { this.state.showResults ? <Result result={this.state.result} /> : null}
                   </Col>
                </Row>
           </Container>
        );
    }
}

export default Main;
