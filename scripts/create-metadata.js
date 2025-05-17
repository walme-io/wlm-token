import { Connection, clusterApiUrl, PublicKey, Keypair } from "@solana/web3.js";
import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import fs from "fs";
import os from "os";

const secretKey = Uint8Array.from(
  JSON.parse(fs.readFileSync(`${os.homedir()}/.config/solana/id.json`, "utf-8"))
);
const wallet = Keypair.fromSecretKey(secretKey);

const connection = new Connection(clusterApiUrl("devnet"));
const metaplex = Metaplex.make(connection).use(keypairIdentity(wallet));

async function createMetadata() {
  const mintAddress = new PublicKey("143sc8sqY32ZB7PiJXziffydcyTP9BXapb6QkUUXp97d"); 
  const metadataUri = "https://raw.githubusercontent.com/walme-io/wlm-token/devnet-v1/token-info/wlmt-metadata.json";

  const { metadata } = await metaplex.nfts().create({
    name: "Walme Token (Testnet)",
    symbol: "WLMt",
    uri: metadataUri,
    sellerFeeBasisPoints: 0,
    isMutable: false,
    tokenStandard: 0, // 0 = Fungible Token (SPL)
    useNewMint: false,
    mintAddress,
  });

  console.log("✅ Metadata created at:", metadata.address.toBase58());
}

createMetadata().catch(console.error);
