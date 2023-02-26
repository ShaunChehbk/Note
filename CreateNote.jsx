import React from "react";
import { addMathNote } from "./API";
import { process } from "./Note";
import { a } from "./Analyzer";


export default class CreateNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content : ""
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {
        this.setState(() => ({content : e.target.value}));
    }

    handleSubmit(e) {
        let data = {
            content: this.state.content
        }
        addMathNote(data)
            .then(response => {
                if (response.status === 201) {
                    return response.json()
                }
            })
            .then(data => this.props.afterSubmit(data))
            .catch(err => console.log(err));

    }

    render() {
        return (
            <div>
                <textarea
                    name="CreateNote"
                    rows="5"
                    cols="100"
                    onChange={this.handleInput}
                />
                <br />
                <React.StrictMode>

                <Preview content={this.state.content} />
                </React.StrictMode>
                <br />
                <button
                    onClick={this.handleSubmit}
                >Confirm</button>
            </div>
        )
    }
}

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: props
        }
    }

    render() {
        console.log(this.state.content);
        return (
            <div>
                {process(this.props.content)}
            </div>
        )
    }
}