
class Analyzer {
    constructor() {
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
        } else {
            this.current += c;
        }
    
    }
}

string = "This is normal $ This is inline math $, and here we go normal again"

let a = new Analyzer();
for (var i = 0; i < string.length; i++) {
    a.process(string.charAt(i));
}
console.log(a.result);