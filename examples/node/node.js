const {
  decrypt_with_user_passphrase,
  decrypt_with_x25519,
  encrypt_with_user_passphrase,
  encrypt_with_x25519,
  encrypt_with_x25519_2,
  get_public_key,
  keygen
} = require('./rage-wasm')

const main = async () => {
  const key1 = await keygen()
  const key2 = await keygen()
  console.log(key1)
  console.log(key2)
  const key1Pubkey = await get_public_key(key1[0])
  console.log(key1[1] === key1Pubkey)
  const data = new TextEncoder().encode('hello world')
  const cipher = await encrypt_with_x25519_2([key1[1], key2[1]], data)
  console.log(cipher)
  const plain = await decrypt_with_x25519(key1[0], cipher)
  console.log(new TextDecoder().decode(plain))
}

main()