const { MerkleTree } = require('merkletreejs');
const SHA256 = require('crypto-js/sha256');

const addresses = [
    '0x5c08e85f71a5dE04515cB2F2F25C659E564A5B00',
  '0xA3C0dC6C3C1a4B682f6e8A2a27C59fE2b4c6e6A5',
  '0x8f4cBeD0cF2B9D7E8bF95D73A1D466Fc18a8c6D5',
  '0xE3d6F7A6dE2C7B2d0A70c8D9b2e31d7A5F4C6F3B',
  '0xF98cBc736F9b0D637b1fFDd0eF663e07d4b42691'
];

// Generate leaf nodes by hashing addresses
const leafNodes = addresses.map(addr => SHA256(addr).toString());
const merkleTree = new MerkleTree(leafNodes, SHA256);

// Get the Merkle root
const root = merkleTree.getRoot().toString('hex');
console.log("Merkle Root:", root);

// Generate proof for a specific address
const addressToVerify = "0xF98cBc736F9b0D637b1fFDd0eF663e07d4b42691"; // Example address
const leafToVerify = SHA256(addressToVerify).toString();
const proof = merkleTree.getProof(leafToVerify);

// Verify the proof
const isValid = merkleTree.verify(proof, leafToVerify, root);
console.log(`Address ${addressToVerify} is part of the tree?`, isValid);
