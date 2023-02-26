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
        this.atNormal = this.atNormal.bind(this);
        this.atMath = this.atMath.bind(this);
        this.outBlock = this.outBlock.bind(this);
        this.atBlock = this.atBlock.bind(this);
        this.atInline = this.atInline.bind(this);
        this.renderOn = this.renderOn.bind(this);
        this.process = this.atNormal
    }
    render() {
        return (
            <div id={this.state.note.id}>
                {/* 不要用a.renderOn() */}
                {console.log(this.state.note.id, "render()")}
                {this.a.renderOn(this.state.note.content)}
            </div>
        )
    }
    atNormal(c) {
        if (c == '$') {
            this.process = this.atMath;
            if (this.current !== "") {
                this.setState(prev => ({
                    note: prev.note,
                    current: prev.current,
                    result: prev.result.concat(<MarkText content={this.current} />)
                }))
                this.setState(prev => ({
                    note: prev.note,
                    current: "",
                    result: prev.result
                }))
            }
        } else if (c == '\0') {
            if (this.current !== "") {
                this.setState(prev => ({
                    note: prev.note,
                    current: prev.current,
                    result: prev.result.concat(<MarkText content={this.current} />)
                }))
                this.setState(prev => ({
                    note: prev.note,
                    current: "",
                    result: prev.result
                }))
            }
        } else {
            this.setState(prev => ({
                note: prev.note,
                current: prev.current + c,
                result: prev.result
            }))
        }
    }

    atMath(c) {
        //相邻的$$视为block标识符, $_$为空inline
        if (c == '$') {
            this.process = this.atBlock
        } else if (c == '\0') {
        } else {
            this.process = this.atInline;
            this.process(c);
        }
    }

    outBlock(c) {
        if (c == '$') {
            this.process = this.atNormal;
            if (this.current !== "") {
                this.setState(prev => ({
                    note: prev.note,
                    current: prev.current,
                    result: prev.result.concat(<BlockMath math={this.current} />)
                }))
                this.setState(prev => ({
                    note: prev.note,
                    current: "",
                    result: prev.result
                }))
            }
        } else {
        }
    }

    atBlock(c) {
        if (c == '$') {
            this.process = this.outBlock;
        } else {
            this.setState(prev => ({
                note: prev.note,
                current: prev.current + c,
                result: prev.result
            }))
        }
    }
    
    atInline(c) {
        if (c == '$') {
            this.process = this.atNormal;
            if (this.current !== "") {
                this.setState(prev => ({
                    note: prev.note,
                    current: prev.current,
                    result: prev.result.concat(<InlineMath math={this.current} />)
                }));
                this.setState(prev => ({
                    note: prev.note,
                    current: "",
                    result: prev.result
                }))
            }
        } else if (c == '\0') {
        } else {
            this.setState(prev => ({
                note: prev.note,
                current: prev.current + c,
                result: prev.result
            }))
        }
    
    }
    renderOn() {
        string = string + '\0';
        for (var i = 0; i < string.length; i++) {
            this.process(string.charAt(i));
        }
        return this.result;
    }
}