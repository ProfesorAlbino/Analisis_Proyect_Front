import CryptoJS from 'crypto-js';

// Función para encriptar con AES-256
export function encryptAES(message) {
    const key = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6";
    const encrypted = CryptoJS.AES.encrypt(message, key).toString();
    return encrypted.replace(/\//g, '_'); // Reemplazar "/" con "_"
}

// Función para desencriptar con AES-256
export function decryptAES(ciphertext) {
    const key = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6";
    const replacedCiphertext = ciphertext.replace(/_/g, '/'); // Revertir el reemplazo
    const decrypted = CryptoJS.AES.decrypt(replacedCiphertext, key).toString(CryptoJS.enc.Utf8);
    console.log(decrypted);
    return decrypted;
}