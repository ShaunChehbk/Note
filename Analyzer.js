
class Analyzer {
    constructor(string) {
        this.string = string + '\0';
        console.log(this.string);
        this.process = this.atNormal
        this.result = []
        this.current = ""
    }
    atNormal(c) {
        if (c == '$') {
            //if next == $ then 'block mode'
            console.log('Normal -> Inline');
            this.process = this.atMath;
            this.result.push(this.current);
            this.current = "";
        } else if (c == '\0') {
            this.result.push(this.current);
        } else {
            this.current += c;
        }
    }

    atMath(c) {
        //相邻的$$视为block标识符, $_$为空inline
        if (c == '$') {
            console.log('Normal -> Block')
            this.process = this.atBlock
        } else if (c == '\0') {
            //Error
        } else {
            //atInline
            this.process = this.atInline
        }
    }

    outBlock(c) {
        if (c == '$') {
            this.process = this.atNormal;
            this.result.push(this.current);
            this.current = "";
        } else {
            //Error
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
            console.log('Inline -> Normal');
            this.process = this.atNormal;
            this.result.push(this.current);
            this.current = "";
        } else if (c == '\0') {
            console.log("Error");
        } else {
            this.current += c;
        }
    
    }
}

string = "This is normal $ This is inline math $, and here we go normal again$$$Block$$\0"

let a = new Analyzer("This is normal $ This is inline math $, and here we go normal again$$$Block$$");
for (var i = 0; i < string.length; i++) {
    a.process(string.charAt(i));
}
console.log(a.result);