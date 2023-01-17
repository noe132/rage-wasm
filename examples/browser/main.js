import {
  decrypt_with_user_passphrase,
  decrypt_with_x25519,
  encrypt_with_user_passphrase,
  encrypt_with_x25519,
  encrypt_with_x25519_2,
  keygen
} from './index.js'

window.decrypt_with_user_passphrase = decrypt_with_user_passphrase;
window.decrypt_with_x25519 = decrypt_with_x25519;
window.encrypt_with_user_passphrase = encrypt_with_user_passphrase;
window.encrypt_with_x25519 = encrypt_with_x25519;
window.keygen = keygen;

const main = async () => {
  const key1 = await keygen()
  const key2 = await keygen()
  const data = new TextEncoder().encode('hello world')
  const cipher = await encrypt_with_x25519_2([key1[1], key2[1]], data)
  console.log(cipher)
  const plain = await decrypt_with_x25519(key1[0], cipher)
  console.log(new TextDecoder().decode(plain))
}

main()