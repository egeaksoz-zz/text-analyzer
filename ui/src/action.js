
export const analyze = (text) => {
    fetch(`/analyze`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            text: text
        })
    })
        .then((res) => {
        })
        .catch((err) => {
            console.log(err);
        });
}

export const result = () => {
    return fetch(`/result`, {
        method: "GET"
    })
        .then((res) => {
            return res.json();
        })
        .then(resJson => {
            return resJson;
            //this.setState({ result: resJson, showResults: true });
        })
        .catch((err) => {
            console.log(err);
        });
}