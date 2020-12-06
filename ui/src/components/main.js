import React from 'react';
import { InputGroup, Button, FormControl } from 'react-bootstrap';
import Result from './result';

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
            <div>
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text> Enter your text here: </InputGroup.Text>
                    <FormControl as="textarea" aria-label="analyze-text" value={this.state.text} onChange={e => this.setState({ text: e.target.value})} />
                </InputGroup.Prepend>
                <Button type="button" id="analyze" onClick={this.analyze}>Analyze</Button>
            </InputGroup>
            { this.state.showResults ? <Result result={this.state.result} /> : null}
           </div>
        );
    }
}

export default Main;
