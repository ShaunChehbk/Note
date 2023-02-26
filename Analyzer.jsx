import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import MarkText from './MarkText';

export default class Analyzer {
    constructor(string) {
        this.string = string + '\0';
        this.atNormal = this.atNormal.bind(this);
        this.atMath = this.atMath.bind(this);
        this.outBlock = this.outBlock.bind(this);
        this.atBlock = this.atBlock.bind(this);
        this.atInline = this.atInline.bind(this);
        this.renderOn = this.renderOn.bind(this);
        this.process = this.atNormal
        this.result = []
        this.current = ""
    }
    atNormal(c) {
        if (c == '$') {
            this.process = this.atMath;
            if (this.current !== "") 
                this.result.push(<MarkText content={this.current} />);
            this.current = "";
        } else if (c == '\0') {
            if (this.current !== "") 
                this.result.push(<MarkText content={this.current} />);
        } else {
            this.current += c;
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
            if (this.current !== "") 
                this.result.push(<BlockMath math={this.current} />);
            this.current = "";
        } else {
        }
    }

    atBlock(c) {
        if (c == '$') {
            this.process = this.outBlock;
        } else {
            this.current += c;
        }
    }
    
    atInline(c) {
        if (c == '$') {
            this.process = this.atNormal;
            if (this.current !== "") 
                this.result.push(<InlineMath math={this.current} />);
            this.current = "";
        } else if (c == '\0') {
        } else {
            this.current += c;
        }
    
    }
    renderOn(string) {
        string = string + '\0';
        console.log('string', string)
        this.result=[];
        for (var i = 0; i < string.length; i++) {
            this.process(string.charAt(i));
        }
        return this.result;
    }
}

var string = "This is normal $ This is inline math $, and here we go normal again$$Block$$\0"

let b = new Analyzer("This is normal $ This is inline math $, and here we go normal again$$$Block$$");

export var a = new Analyzer();