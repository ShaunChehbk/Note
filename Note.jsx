import React from "react";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import MarkText from './MarkText';
import Analyzer from "./Analyzer";
import { a } from "./Analyzer";


var string = "设$a \\ne \\displaystyle\\frac{1}{2}$，则$\\lim\\limits_{n \\to \\infty}\\left[ \\displaystyle \\frac{n-2na+1}{n\\lparen 1-2a\\rparen}\\right]^n$"
var complex = "多项式$f(x)=\\begin{vmatrix} x & 2x & 1 & 0 \\\\ 2 & x - 1 & 1 & 3 \\\\ 1 & 2 & x & -1 \\\\ x & 5 & 6 & 2 \\end{vmatrix}$中，$x^3$的系数为"



export default class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note: this.props.note,
            current: "",
            result: []
        }
        this.a = new Analyzer();
        //加入以下绑定后，[且带负号的项]写出....且带负号的项的问题消失
    }
    render() {
        return (
            <div id={this.state.note.id}>
                {/* 不要用a.renderOn() */}
                {console.log(this.state.note.id, "render()")}
                {/* {this.a.renderOn(this.state.note.content)} */}
                {process(this.state.note.content)}
            </div>
        )
    }
}

export const process = (string) => {
    let result = []
    let current = ""
    function atNormal(c) {
        if (c === '$') {
            state = atMath;
            if (current !== "") 
            result.push(<MarkText content={current} />);
            current = "";
        } else if (c === '\0') {
            if (current !== "") 
            result.push(<MarkText content={current} />);
            current = "";
        } else if (c === '\n') {
            result.push(<MarkText content={current} />);
            current = "";
            result.push(<br />)
        } else {
            current += c;
        }
    }

    function atMath(c) {
        //相邻的$$视为block标识符, $_$为空inline
        if (c === '$') {
            state = atBlock
        } else if (c === '\0') {
        } else {
            state = atInline;
            state(c);
        }
    }

    function outBlock(c) {
        if (c === '$') {
            state = atNormal;
            if (current !== "") 
                result.push(<BlockMath math={current} />);
            current = "";
        } else {
        }
    }

    function atBlock(c) {
        if (c === '$') {
            state = outBlock;
        } else {
            current += c;
        }
    }
    
    function atInline(c) {
        if (c === '$') {
            state = atNormal;
            if (current !== "") 
                result.push(<InlineMath math={current} />);
            current = "";
        } else if (c === '\0') {
        } else {
            current += c;
        }
    
    }
    let state = atNormal;
    console.log(string);
    string = string + '\0';
    for (var i = 0; i < string.length; i++) {
        state(string.charAt(i), current, result);
    }
    return result;
}