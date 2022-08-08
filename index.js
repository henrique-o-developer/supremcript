var NDC = 65535;
var maxArrayL = 4294967294;
var intMaxNumber = 1.7976931348623157e+10;
var allOpsChar = ["+", "-", "%", "~", "<<", ">>", "&&", "||"];
var allOps = allOpsChar.map(function (v) {
    if (v == "~") {
        return function (a, b) { return ~a + ~b; };
    }
    else {
        return new Function("return (a, b) => (a ".concat(v, " b) || 0"))();
    }
});
var SUPREM = /** @class */ (function () {
    function SUPREM() {
    }
    SUPREM.prototype.encrypt = function (msg, pass, iv, salt, char) {
        pass = pass.map(function (v) { return v.split(""); }).flat();
        var m = msg.split("");
        var npass = pass.map(function (v) { return v.charCodeAt(0) % salt; });
        var r = "";
        var al = 1;
        m.forEach(function (v, j, arr) {
            var code = v.charCodeAt(0);
            var opN = 0;
            pass.forEach(function (p, i) {
                if (i % j + 1 == 0 && opN < p.length / j)
                    return;
                opN++;
                code += SUPREM.getAtualOp(npass, iv, i)(al, p.charCodeAt(0)) % opN;
                //al += salt;
                //al %= NDC;
            });
            //iv++;
            r += SUPREM.fromCharCode(code);
            code %= NDC;
            var n = code % char;
            var n1 = 0;
            for (; n > 0; n--) {
                n1 += SUPREM.getAtualOp(npass, al, n)(iv, code);
                r += SUPREM.fromCharCode(n1 + code);
            }
        });
        var total = 0;
        r.split("").forEach(function (v, i) {
            total += SUPREM.getAtualOp(npass, al, i)(iv, v.charCodeAt(0));
        });
        return r.split("").map(function (v) { return SUPREM.fromCharCode(v.charCodeAt(0) + total); }).join("") + SUPREM.fromCharCode(total);
    };
    SUPREM.prototype.decrypt = function (msg, pass, iv, salt, char) {
        pass = pass.map(function (v) { return v.split(""); }).flat();
        var total = msg.slice(-1).charCodeAt(0);
        msg = msg.substring(0, msg.length - 1);
        msg = msg.split("").map(function (v) { return SUPREM.fromCharCode(v.charCodeAt(0) - total); }).join("");
        var m = msg.split("");
        var npass = pass.map(function (v) { return v.charCodeAt(0) % salt; });
        var r = "";
        var al = 1;
        var n = 0;
        m.forEach(function (v, j, arr) {
            /*if (j != 0) if (SUPREM.range(arr[j-1].charCodeAt(0) % salt, al % salt, 100)) {
                return;
            }*/
            if (n > 0) {
                n--;
                return;
            }
            var code = v.charCodeAt(0);
            n = code % char;
            var opN = 0;
            pass.forEach(function (p, i) {
                if (i % j + 1 == 0 && opN < p.length / j)
                    return;
                opN++;
                code -= SUPREM.getAtualOp(npass, iv, i)(al, p.charCodeAt(0)) % opN;
                //al += salt;
                //al %= NDC;
            });
            //iv++;
            r += SUPREM.fromCharCode(code);
        });
        return r;
    };
    SUPREM.random = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    SUPREM.cap = function (min, max, number) {
        return Math.max(min, Math.min(number, max));
    };
    SUPREM.getAtualOp = function (na, al, index) {
        var ind = index;
        return Array(index + 1).fill("undefinede").map(function () { return allOps[(na[ind % na.length] * al) % allOps.length]; })[index];
    };
    SUPREM.fromCharCode = function (code) {
        return String.fromCharCode(code % NDC);
    };
    SUPREM.range = function (n1, n2, range) {
        console.log(Array.from(arguments));
        return n1 + range >= n2 && n1 - range <= n2;
    };
    return SUPREM;
}());
module.exports = new SUPREM();
module.exports.SUPREM = SUPREM;
module.exports.NDC = NDC;
module.exports.MAL = maxArrayL;
module.exports.IMN = intMaxNumber;
