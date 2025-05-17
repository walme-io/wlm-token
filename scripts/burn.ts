import dotenv from 'dotenv';
dotenv.config();

import bs58 from 'bs58';
import readline from 'readline';
import {
  Connection,
  Keypair,
  clusterApiUrl,
  PublicKey
} from '@solana/web3.js';

import {
  getOrCreateAssociatedTokenAccount,
  burn
} from '@solana/spl-token';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question: string): Promise<string> {
  return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const payer = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY_BASE58!));
  const owner = payer.publicKey;

  const mint = new PublicKey('BxHP1VmR3rd7fZWC5CE6cyzrY5mnKVJF1Lw4M5WZjqtj');
  const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, payer, mint, owner);

  // Prompt for burn amount
  const input = await ask('🔥 Enter amount of WLMt to burn (e.g. 1000.25): ');
  const amount = parseFloat(input);
  if (isNaN(amount) || amount <= 0) {
    console.error('❌ Invalid amount');
    rl.close();
    return;
  }

  const burnAmount = BigInt(Math.floor(amount * 1_000_000)); // to base units
  console.log(`\nYou are about to burn ${amount} WLMt (${burnAmount.toString()} base units)`);
  const confirm = await ask('Type "yes" to confirm: ');

  if (confirm.trim().toLowerCase() !== 'yes') {
    console.log('❌ Cancelled.');
    rl.close();
    return;
  }

  const sig = await burn(
    connection,
    payer,
    tokenAccount.address,
    mint,
    owner,
    Number(burnAmount)
  );

  console.log(`✅ Burned ${amount} WLMt`);
  console.log(`🔗 Explorer: https://explorer.solana.com/tx/${sig}?cluster=devnet`);
  rl.close();
}

main().catch(err => {
  console.error(err);
  rl.close();
});
