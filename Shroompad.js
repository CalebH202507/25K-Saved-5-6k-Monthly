import Wallet from '@project-serum/sol-wallet-adapter';

let provider = 'https://www.sollet.io';

// For sollet extension use
// provider = window.sollet

let wallet = new Wallet(provider);
wallet.on('connect', publicKey => console.log('Connected to ' + publicKey.toBase58()));
wallet.on('disconnect', () => console.log('Disconnected'));
await wallet.connect();

// Sending a transaction
let connection = new Connection(clusterApiUrl('devnet'));

let transaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: wallet.publicKey,
    toPubkey: wallet.publicKey,
    lamports: 100,
  })
);
let { blockhash } = await connection.getRecentBlockhash();
transaction.recentBlockhash = blockhash;
transaction.feePayer = wallet.publicKey;
let signed = await wallet.signTransaction(transaction);
let txid = await connection.sendRawTransaction(signed.serialize());
await connection.confirmTransaction(txid);

// Phantom Wallet
window.solana.connect();
window.solana.on("connect", () => console.log("connected!"))

console.log(window.solana.publicKey);