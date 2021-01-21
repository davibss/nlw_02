import bcrypt from 'bcrypt';

export async function makeHash(password: string){
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds).then(function(hash) {
        return hash;
    });
}

export async function compareHash(plainPassword: string, hashPassword: string){
    return bcrypt.compare(plainPassword, hashPassword).then(function(result) {
        return result;
    });
}