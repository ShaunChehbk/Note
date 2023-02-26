import React from "react";

export default class MarkText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content : ""
        }
    }
    render() {
        return (
            <span>
                {this.props.content}
            </span>
        )
    }
}