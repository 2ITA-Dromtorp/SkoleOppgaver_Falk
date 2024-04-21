
module.exports.generateSalt = function generateSalt() {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let salt = '';
    for (let i = 0; i < 16; i++) {
        salt += characters[Math.floor(Math.random() * characters.length)];
    }
    return salt;
}

module.exports.customHash = function customHash(password, salt, iterations = 10000) {
    let hashedString = password + salt;

    for (let i = 0; i < iterations; i++) {
        let hash = 0;
        for (let j = 0; j < hashedString.length; j++) {
            hash = (hash << 5) - hash + hashedString.charCodeAt(j);
            hash |= 0; // Convert to 32bit integer
        }
        hashedString = String(hash);
    }

    return `flakcrypt$${iterations}$${salt}$${hashedString}`;
}


module.exports.flakcrypt = function flakcrypt(password) {
    const salt = module.exports.generateSalt();
    return module.exports.customHash(password, salt);
}

module.exports.flakcompare = function flakcompare(daCrypt, password) {
    const parts = daCrypt.split('$');
    const iterations = parseInt(parts[1]);
    const salt = parts[2];
    const hash = parts[3];
    console.log(parts, iterations, salt, hash, module.exports.customHash(password, salt, iterations), daCrypt, module.exports.customHash(password, salt, iterations) === daCrypt);
    return module.exports.customHash(password, salt, iterations) === daCrypt;
}