
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
            this.process = this.atInline;
            this.result.push(this.current);
            this.current = "";
        } else if (c == '\0') {
            this.result.push(this.current);
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

string = "This is normal $ This is inline math $, and here we go normal again$\0"

let a = new Analyzer("This is normal $ This is inline math $, and here we go normal again$");
for (var i = 0; i < string.length; i++) {
    a.process(string.charAt(i));
}
console.log(a.result);