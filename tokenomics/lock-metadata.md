# 🔒 Metadata Locked for WLMt Token

The on-chain metadata for the WLMt token has been permanently locked. This means the `updateAuthority` has been removed, making it impossible to further edit:

- Name  
- Symbol  
- URI (including image and external links)  
- Creators  
- Royalties  

---

## ✅ Why Lock Metadata?

Locking metadata is the final step in establishing trust and immutability for token configurations. It ensures that:

- No changes can be made without consensus (or a fork)  
- Token representation remains stable across marketplaces and wallets  
- IPFS-based metadata remains authoritative and censorship-resistant  
- DAO and governance participants interact with finalized token structure  

---

## 🔐 What Changed?

- `updateAuthority` was explicitly set to `null`  
- All other metadata fields (name, symbol, image, creators) remained unchanged  

### Transaction Reference

- View transaction on [Solana Explorer](https://explorer.solana.com/address/BxHP1VmR3rd7fZWC5CE6cyzrY5mnKVJF1Lw4M5WZjqtj?cluster=devnet)

---

## 📄 Related Files

- [`lock-metadata.ts`](../scripts/lock-metadata.ts) — script used to lock metadata  
- [`mint-disabled.md`](./mint-disabled.md) — mint authority revocation  
- [`burn.md`](./burn.md) — burn mechanism  
- [`mint-info.txt`](../devnet/mint-info.txt) — token snapshot  

---

By locking the metadata and mint authority, the WLMt test token now simulates a fully finalized, immutable governance token in a production-grade Web3 ecosystem.
