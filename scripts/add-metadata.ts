const dotenv = require('dotenv');
dotenv.config();

const bs58 = require('bs58').default;
const {
  Connection,
  Keypair,
  PublicKey,
  clusterApiUrl,
  Transaction,
  sendAndConfirmTransaction
} = require('@solana/web3.js');

const {
  createCreateMetadataAccountV3Instruction,
  PROGRAM_ID,
  DataV2
} = require('@metaplex-foundation/mpl-token-metadata');

async function main() {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  const secretKey = bs58.decode(process.env.PRIVATE_KEY_BASE58!);
  const payer = Keypair.fromSecretKey(secretKey);

  const mint = new PublicKey('BxHP1VmR3rd7fZWC5CE6cyzrY5mnKVJF1Lw4M5WZjqtj'); // твой mint

  // Вычисляем PDA (Metadata account address)
  const [metadataPDA] = await PublicKey.findProgramAddressSync(
    [
      Buffer.from('metadata'),
      PROGRAM_ID.toBuffer(),
      mint.toBuffer()
    ],
    PROGRAM_ID
  );

  const metadataData: DataV2 = {
    name: 'Walme Token (Testnet)',
    symbol: 'WLMt',
    uri: 'https://raw.githubusercontent.com/walme-io/wlm-token/devnet-v1/token-info/wlmt-metadata.json',
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null
  };

  const instruction = createCreateMetadataAccountV3Instruction(
    {
      metadata: metadataPDA,
      mint,
      mintAuthority: payer.publicKey,
      payer: payer.publicKey,
      updateAuthority: payer.publicKey
    },
    {
      createMetadataAccountArgsV3: {
        data: metadataData,
        isMutable: true,
        collectionDetails: null
      }
    }
  );

  const tx = new Transaction().add(instruction);

  const txId = await sendAndConfirmTransaction(connection, tx, [payer]);
  console.log('✅ Metadata added! Transaction ID:', txId);
  console.log(`🔗 https://explorer.solana.com/tx/${txId}?cluster=devnet`);
}

main().catch(console.error);
