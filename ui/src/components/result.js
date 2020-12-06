import React from 'react';
import PropTypes from "prop-types";

class Result extends React.Component {
    render() {
        let result = this.props.result;
        const analysis = [];
        result.forEach(res => {
            analysis.push(
                <p key={res.id}>The word is: {res.word}, count is: {res.count}</p>
            )
        })

    return(
        <div>
            <p> Here is analysis: </p>
            <p> {analysis} </p>
        </div>
    )}
}

export default Result;

Result.propType = {
    result: PropTypes.object.isRequired
}