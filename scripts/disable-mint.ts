import dotenv from 'dotenv';
dotenv.config();

import bs58 from 'bs58';
import {
  Connection,
  Keypair,
  clusterApiUrl,
  PublicKey,
} from '@solana/web3.js';

import {
  setAuthority,
  AuthorityType
} from '@solana/spl-token';

async function main() {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  // Load signer from env
  const payer = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY_BASE58!));
  const mint = new PublicKey('BxHP1VmR3rd7fZWC5CE6cyzrY5mnKVJF1Lw4M5WZjqtj');

  // Disable mint authority forever
  const tx = await setAuthority(
    connection,
    payer,               // payer (signer)
    mint,                // token mint address
    payer.publicKey,     // current authority
    AuthorityType.MintTokens, // we want to disable minting
    null                 // setting new authority to null
  );

  console.log('✅ Mint authority removed — minting is now permanently disabled.');
  console.log(`🔗 Explorer: https://explorer.solana.com/tx/${tx}?cluster=devnet`);
}

main().catch(console.error);
