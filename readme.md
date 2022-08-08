# SUPREMCRIPT

## moved here!!

## PT

### 4.3

#### encriptando

```js
var IV = SALT = CHAR = 237;
//                                senha da criptografia
//                                          \
//                                           \       mais um numero
//                                            \              \  
//                                            \/             \/
var msg = SUPREMCRIPT.encrypt("STRING", [ "PA", "SS" ], IV, SALT, CHAR)
//                               /\                     /\          /\
//                               /                       \           \
//                              /                      numero         \ 
//                             /                                      /       
//                   string para criptografar                        /
//                                                                  /
//                                   numero de possibilidades "aleatorias" para novos caracteres
```

#### decriptando

```js
//                                a mesma senha de antes  
//                                          /             ───── mais um numero
//                                         /            /
//                                        /             \  
//                                       \/             \/
var dec = SUPREMCRIPT.decrypt(msg, [ "PA", "SS" ], IV, SALT, CHAR)
//                             /\                  /\          /\
//                             /                    \          /
//                            /                     /         /  
//                           /                ──────          |       
//  string criptografada ───                /                 |  
//                                       numero      mesma coisa de antes
//                                   
```