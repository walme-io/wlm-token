const dotenv = require('dotenv');
dotenv.config();

const bs58 = require('bs58').default;
const { Connection, clusterApiUrl, Keypair } = require('@solana/web3.js');
const {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo
} = require('@solana/spl-token');

async function main() {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  const base58Key = process.env.PRIVATE_KEY_BASE58;
  if (!base58Key) {
    throw new Error('❌ Missing PRIVATE_KEY_BASE58 in .env');
  }

  const secretKey = bs58.decode(base58Key);
  const payer = Keypair.fromSecretKey(secretKey);

  const mint = await createMint(
    connection,
    payer,
    payer.publicKey,
    null,
    6
  );
  console.log('✅ Mint address:', mint.toBase58());

  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    payer.publicKey
  );
  console.log('✅ Token account:', tokenAccount.address.toBase58());

  const amount = BigInt(10_000_000_000) * BigInt(10 ** 6);
  await mintTo(
    connection,
    payer,
    mint,
    tokenAccount.address,
    payer,
    Number(amount.toString())
  );
  console.log(`✅ Minted ${amount.toString()} tokens to your wallet`);
}

main().catch(console.error);
