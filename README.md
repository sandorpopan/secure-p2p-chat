# secure-p2p-chat
1. **Perfect Forward Secrecy & Key Derivation:** Cryptographic keys are derived natively within the browser's sandbox using the **PBKDF2** (Password-Based Key Derivation Function 2) algorithm over 100,000 iterations via SHA-256. Keys remain strictly in local RAM and are never transmitted over the network.
2. **Military-Grade Symmetric Encryption:** Text payloads are converted to raw binary arrays and encrypted using **AES-GCM (256-bit)**. Every single packet generates a cryptographically secure, random 96-bit Initialization Vector (IV/nonce) to defend against replay and chosen-ciphertext attacks.
3. **Data Privacy:** Because no data passes through the signaling broker post-handshake, it is mathematically impossible for the server operator to inspect, log, or leak your conversations.

---

## 🚀 Quick Start Guide

### 1. Installation & Environment Setup
Ensure you have [Node.js](https://nodejs.org/) installed on your machine. Clone or download this project, navigate into the directory, and set up the signaling dependencies:

```bash
# Initialize and install dependencies
npm install ws
