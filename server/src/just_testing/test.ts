import bcrypt from 'bcrypt';
import { makeHash } from '../utils/hashPassword';

console.log("Hello world");

const saltRounds = 10;
const myPlaintextPassword = 'senha123';
const someOtherPlaintextPassword = 'not_bacon';

makeHash(myPlaintextPassword).then(console.log);
// console.log(makeHash(myPlaintextPassword));
// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//     console.log(hash);
// });

const hash = "$2b$10$qM55Bhbo0DCsAH7WgeL58u97Lq9t1nObKLb.sd12Ihe9HX.nOGAT2";
bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    // result == true
    console.log(result);
});