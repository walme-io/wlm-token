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

  const newMetadata = {
    name: 'Walme Token (Testnet)',
    symbol: 'WLMt',
    uri: 'https://bafybeibe6uxjza45nwopor7bc7ksvsyrocarf7agrxovng6k6vptzaxfbm.ipfs.w3s.link/wlmt-metadata.json',
    sellerFeeBasisPoints: 0,
    creators: [
      {
        address: new PublicKey('3199hHqfCnXx97MWCLdtR6jXyXaBvEjyxqf3iyfg6VcC'),
        verified: true,
        share: 100,
      }
    ],
    collection: null,
    uses: null
  };

  const ix = createUpdateMetadataAccountV2Instruction(
    {
      metadata: metadataPDA,
      updateAuthority: payer.publicKey,
    },
    {
      updateMetadataAccountArgsV2: {
        data: newMetadata,
        updateAuthority: payer.publicKey,
        primarySaleHappened: null,
        isMutable: true,
      }
    }
  );

  const tx = new Transaction().add(ix);
  const sig = await sendAndConfirmTransaction(connection, tx, [payer]);

  console.log('✅ On-chain metadata updated with IPFS URI');
  console.log(`🔗 Explorer: https://explorer.solana.com/tx/${sig}?cluster=devnet`);
}

main().catch(console.error);
