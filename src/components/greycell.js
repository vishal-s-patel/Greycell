import React, { Component } from 'react';


class greycell extends Component {
    constructor(props) {
        super(props);
        this.state = { paragraph: '', wordToSkip: null, newParagraph: "" };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    handleSubmit(event) {
        event.preventDefault();
        var paragraph = this.state.paragraph;
        var nWord = this.state.wordToSkip;
        if (isNaN(nWord) || Number.parseInt(nWord) < 0) {
            document.getElementById("errorMessage").innerHTML = "Invalid Input";
            return false;
        } else {
            document.getElementById("errorMessage").innerHTML = "";
        }
        //console.log(paragraph, nWord);
        var sentences = paragraph.split(".");
        var sentence, newPara = [];
        for (sentence of sentences) {
            //console.log(sentences);
            var words = sentence.split(" ");
            //console.log(words);
            if (nWord < words.length) {
                const index = ((words.length) - nWord)
                const rawArray = words.slice(0, index);
                const reverseArray = rawArray.reverse();
                const remArray = words.slice(index, words.length);
                const newLine = reverseArray.join(" ") + " " + remArray.join(" ");
                console.log(newLine);
                newPara.push(newLine);
            } else {
                newPara.push(sentence);
            }
        }
        this.setState({ newParagraph: newPara.join(". ") });

    }
    render() {
        return (
            <div>
                <h2 style={{ textAlign: "center" }}>String Manipulation</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">Input String:</label>
                        <div className="col-sm-8">
                            <textarea className="form-control" placeholder='enter message' rows="4" name="paragraph" onChange={this.handleChange} required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-3"></div>
                        <label className="col-sm-3 col-form-label" style={{ textAlign: "right" }}>Skip last</label>
                        <div className="col-sm-2">
                            <input className="form-control" type="text" name="wordToSkip" onChange={this.handleChange} required />
                        </div>
                        <label className="col-sm-4 col-form-label">words in a sentence</label>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-6"></div>
                        <div className="col-sm-6">
                            <p id="errorMessage"></p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-6"></div>
                        <div className="col-sm-6">
                            <input className="btn btn-primary" type="submit" value="Run" />
                        </div>
                    </div>
                </form>
                <div className="row">
                    <p className="col-sm-3">Output :</p>
                    {
                        this.state.newParagraph.length > 0 ?
                            <p className="col-sm-9">{this.state.newParagraph}</p>
                            :
                            <p></p>
                    }
                </div>


            </div>
        );
    }
}

export default greycell;