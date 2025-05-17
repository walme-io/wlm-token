# WLMt Token (Testnet) — Walme's Governance & XP Test Token

**WLMt** is the testnet version of the Walme ecosystem token, deployed on the **Solana Devnet** as an SPL token.

This token is designed to simulate the full lifecycle of a utility and governance asset in a real-world Web3 finance platform — including minting, distribution, staking, burning, and metadata locking.

> WLMt is used exclusively for testing: governance voting, XP-based airdrops, vesting simulations, and community engagement ahead of the mainnet launch (TGE).

---

## 🔧 Token Details

- **Token name:** Walme Test Token  
- **Symbol:** WLMt  
- **Decimals:** 6  
- **Total Supply:** 10,000,000,000 WLMt  
- **Network:** Solana Devnet  
- **Token Type:** SPL Token  
- **Mint Address:** [`BxHP1VmR3rd7fZWC5CE6cyzrY5mnKVJF1Lw4M5WZjqtj`](https://explorer.solana.com/address/BxHP1VmR3rd7fZWC5CE6cyzrY5mnKVJF1Lw4M5WZjqtj?cluster=devnet)

---

## 🪪 Add to Phantom Wallet (Recommended)

We recommend testing with [Phantom Wallet](https://phantom.app), which supports Solana Devnet and custom token additions.

**➕ [Add WLMt to Phantom Wallet](https://tokensale.walme.io/phantom-add-wlmt.html)**  
> Works on both mobile and desktop versions via deep link.

---

## 📌 Use Cases (in Testnet)

- 🗳️ Simulated governance via [Realms](https://realms.today/)
- 🎮 XP-to-token claim mechanics and quests
- 📈 Vesting stream simulations via Streamflow
- 🏆 Community leaderboard & ranking experiments
- 🧩 Integration with Telegram MiniApp & Matrix messenger

---

## 🔐 Token Lifecycle: Testnet Simulation

The WLMt token has gone through all major lifecycle stages typical of production-grade Web3 assets:

| Stage                  | Status |
|------------------------|--------|
| Minting                | ✅ Completed (full supply issued)  
| Mint Authority         | 🔒 Revoked permanently  
| Burn Capability        | ✅ Available via CLI  
| Metadata Hosting       | ✅ Migrated to IPFS  
| Update Authority       | 🔒 Revoked (metadata locked)

---

## 🧰 Components

- [`devnet/mint-info.txt`](./devnet/mint-info.txt) — token mint ID and deployment data  
- [`airdrop-script.sh`](./devnet/airdrop-script.sh) — CLI-based airdrop simulation  
- [`wlmt-metadata.json`](./token-info/wlmt-metadata.json) — IPFS-compatible metadata  
- [`vesting-plans.md`](./streamflow/vesting-plans.md) — vesting setup using Streamflow  
- [`realms.md`](./governance/realms.md) — governance instructions for Realms  
- [`burn.md`](./tokenomics/burn.md) — token burn documentation  
- [`mint-disabled.md`](./tokenomics/mint-disabled.md) — disabling minting authority  
- [`lock-metadata.md`](./tokenomics/lock-metadata.md) — locking metadata permanently  
- [`update-ipfs-uri.md`](./tokenomics/update-ipfs-uri.md) — updating URI to IPFS-hosted metadata  

---

## 🧪 Developer Scripts

- [`create-token.ts`](./scripts/create-token.ts) — mint the WLMt token on Devnet  
- [`burn.ts`](./scripts/burn.ts) — burn WLMt tokens from associated wallet  
- [`disable-mint.ts`](./scripts/disable-mint.ts) — permanently revoke mint authority  
- [`lock-metadata.ts`](./scripts/lock-metadata.ts) — lock metadata (updateAuthority = null)  
- [`update-ipfs-uri.ts`](./scripts/update-ipfs-uri.ts) — update token metadata URI to IPFS  
- [`add-metadata.ts`](./scripts/add-metadata.ts) — create Metaplex metadata account  
- [`update-metadata.ts`](./scripts/update-metadata.ts) — general metadata updater  

---

## ⚠️ Disclaimer

This repository is intended **strictly for testnet development**.  
WLMt tokens **have no monetary value**, and are not transferable to mainnet.  
Their purpose is to validate tokenomics, integrations, and UX ahead of the Walme TGE.

---

**Walme** — a next-gen Web3 banking and communication platform.
