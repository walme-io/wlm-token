# 📡 Updating Token Metadata URI to IPFS

This document explains how we migrated the on-chain metadata of the WLMt token to a decentralized IPFS-hosted version.

---

## 🔍 Why Use IPFS?

By default, the token metadata was hosted on GitHub via a raw link. While convenient, it is centralized and mutable.

Moving to IPFS:
- Guarantees permanent content addressing via a content hash (CID)
- Ensures compatibility with marketplaces and NFT indexers
- Strengthens decentralization and censorship resistance

---

## 🛠 Script: `update-ipfs-uri.ts`

This script updates the on-chain metadata URI of the WLMt mint to point to an IPFS version.

**Script path:** `scripts/update-ipfs-uri.ts`  
**Requires:** Metaplex metadata program access (`updateAuthority`)

### IPFS-hosted Metadata JSON:

`https://bafybeibe6uxjza45nwopor7bc7ksvsyrocarf7agrxovng6k6vptzaxfbm.ipfs.w3s.link/wlmt-metadata.json`


### Associated Logo:

`https://bafybeihrsnpi6vu5vfpoxbazdlmpe6vwuojnsqqwmoczlpibtbvzi7xbju.ipfs.w3s.link/wlmt-logo.png`

---

## ▶️ How to Run

`npx ts-node scripts/update-ipfs-uri.ts`

---

## 🔗 On-Chain Results

After running the script:

- ✅ The on-chain `uri` field for the WLMt token now points to a decentralized IPFS link.
- 🧾 Token metadata is immutable in IPFS and publicly retrievable via gateways like [ipfs.io](https://ipfs.io).
- ⚙️ All metadata fields (name, symbol, image, description, creators, etc.) are served from IPFS and referenced in wallets and explorers that support Metaplex.

You can verify the updated URI via:

- [Solscan Mint Page](https://solscan.io/token/BxHP1VmR3rd7fZWC5CE6cyzrY5mnKVJF1Lw4M5WZjqtj?cluster=devnet)
- [Explorer Transaction History](https://explorer.solana.com/address/BxHP1VmR3rd7fZWC5CE6cyzrY5mnKVJF1Lw4M5WZjqtj?cluster=devnet)

---

## 📄 Related Files

- [`wlmt-metadata.json`](../token-info/wlmt-metadata.json) — IPFS-compatible metadata file  
- [`update-metadata.ts`](./update-metadata.ts) — general metadata update script  
- [`lock-metadata.ts`](./lock-metadata.ts) — disables further metadata updates

---

✅ *Using IPFS ensures that token identity remains persistent, verifiable, and decentralized — aligned with Walme’s mission in Web3 finance.*
