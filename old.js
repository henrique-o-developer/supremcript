var NUMERO_DE_CARACTERES = 65535

var methods = {
    SUPREM: {
        encrypt: function encrypt(string, pass, iv, salt, al) {
            var sc = ""
            string = string.toString();
            pass = pass.toString();
            iv = parseInt(iv) % NUMERO_DE_CARACTERES;
            salt = parseInt(salt) % NUMERO_DE_CARACTERES;
            al = parseInt(al) % NUMERO_DE_CARACTERES;
        
            string.split('').forEach((val) => {
                var pssS = 0
                pass.split('').forEach(pss => {
                    pssS += pss.charCodeAt(0);
                });

                iv += Math.pow(salt, al) % NUMERO_DE_CARACTERES
        
                sc += `${String.fromCharCode(val.charCodeAt(0) + iv + pssS)}`;
            }); 

            //sc = sc.substring(0, sc.length-1);
        
            return sc;
        },
        decrypt: function decrypt(string, pass, iv, salt, al) {
            var sd = ""
            iv = parseInt(iv);
            string = string.toString();
            pass = pass.push ? pass.map(v => v.toString()) : [pass.toString()];
            iv = parseInt(iv) % NUMERO_DE_CARACTERES;
            salt = parseInt(salt) % NUMERO_DE_CARACTERES;
            al = parseInt(al) % NUMERO_DE_CARACTERES;
        
            string.split('').forEach((val) => {
                val = val.charCodeAt(0);
                var pssS = 0;
                pass.split('').forEach(pss => {
                    pssS += pss.charCodeAt(0);
                });

                iv += Math.pow(salt, al) % NUMERO_DE_CARACTERES
        
                sd += `${String.fromCharCode(val - iv - pssS)}`;
            }); 
        
            return sd;
        }
    }
};

module.exports = methods;