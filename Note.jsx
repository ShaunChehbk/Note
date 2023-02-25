import React from "react";
import TeX from '@matejmazur/react-katex'
import 'katex/dist/katex.min.css'
import { a } from "./Analyzer";

var string = "f(x)=\\begin{vmatrix} x & 2x & 1 & 0 \\\\ 2 & x - 1 & 1 & 3 \\\\ 1 & 2 & x & -1 \\\\ x & 5 & 6 & 2 \\end{vmatrix}"
var complex = "多项式$f(x)=\\begin{vmatrix} x & 2x & 1 & 0 \\\\ 2 & x - 1 & 1 & 3 \\\\ 1 & 2 & x & -1 \\\\ x & 5 & 6 & 2 \\end{vmatrix}$中，$x^3$的系数为"



export default class Note extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                {a.renderOn(complex)}
            </div>
        )
    }
}