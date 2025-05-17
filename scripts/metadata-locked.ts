import dotenv from 'dotenv';
dotenv.config();

import bs58 from 'bs58';
import {
  Connection,
  Keypair,
  clusterApiUrl,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction
} from '@solana/web3.js';

import {
  createUpdateMetadataAccountV2Instruction
} from '@metaplex-foundation/mpl-token-metadata';

async function main() {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const payer = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY_BASE58!));

  const mint = new PublicKey('BxHP1VmR3rd7fZWC5CE6cyzrY5mnKVJF1Lw4M5WZjqtj');
  const METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

  const [metadataPDA] = await PublicKey.findProgramAddress(
    [
      Buffer.from('metadata'),
      METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer()
    ],
    METADATA_PROGRAM_ID
  );

  const ix = createUpdateMetadataAccountV2Instruction(
    {
      metadata: metadataPDA,
      updateAuthority: payer.publicKey,
    },
    {
      updateMetadataAccountArgsV2: {
        data: null,                // we are not changing data
        updateAuthority: null,    // revoke authority
        primarySaleHappened: null,
        isMutable: null,
      }
    }
  );

  const tx = new Transaction().add(ix);
  const sig = await sendAndConfirmTransaction(connection, tx, [payer]);

  console.log('✅ Metadata locked — update authority removed permanently');
  console.log(`🔗 Explorer: https://explorer.solana.com/tx/${sig}?cluster=devnet`);
}

main().catch(console.error);
