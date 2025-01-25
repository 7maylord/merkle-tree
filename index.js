const { MerkleTree } = require('merkletreejs'); // MerkleTree is used to create and manage a Merkle tree
const SHA256 = require('crypto-js/sha256'); // SHA256 is used as the hashing algorithm

// Define an array of valid addresses
const addresses = [
    '0x5c08e85f71a5dE04515cB2F2F25C659E564A5B40',
    '0xA3C0dC6C3C1a4B682f6e8A2a27C59fE2b4c6e6e5',
    '0x8f4cBeD0cF2B9D7E8bF95D73A1D466Fc18a8c65',
    '0xE3d6F7A6dE2C7B2d0A70c8D9b2e31d7A5F4C6F3B',
    '0xF98cBc736F9b0D637b1fFDd0eF663e07d4b42691'
];

// Define an array of "bad" addresses (with one address altered)
// The second address's last digit has been changed from '5' to '8'.
const addresses2 = [
    '0x5c08e85f71a5dE04515cB2F2F25C659E564A5B40',
    '0xA3C0dC6C3C1a4B682f6e8A2a27C59fE2b4c6e6e8', // Modified address
    '0x8f4cBeD0cF2B9D7E8bF95D73A1D466Fc18a8c65',
    '0xE3d6F7A6dE2C7B2d0A70c8D9b2e31d7A5F4C6F3B',
    '0xF98cBc736F9b0D637b1fFDd0eF663e07d4b42691'
];

// Generate the leaf nodes for the Merkle tree by hashing each address
const leaves = addresses.map(x => SHA256(x));

// Create a Merkle tree using the hashed leaf nodes and the SHA256 hashing algorithm
const tree = new MerkleTree(leaves, SHA256);

// Get the Merkle root from the tree (this represents the "top" of the tree)
const root = tree.getRoot().toString('hex');

// Select the second address in the original "addresses" array and hash it to generate its leaf node
const leaf = SHA256(addresses[1]);

// Generate the Merkle proof for the selected leaf node
const proof = tree.getProof(leaf);

// Verify if the address is part of the Merkle tree by checking the proof against the root
// This should return true since the address is valid and part of the tree
console.log(`Address ${addresses[1]} is part of the tree?`, tree.verify(proof, leaf, root)); // true

// Generate the leaf nodes for the "bad" Merkle tree by hashing the modified addresses
const badLeaves = addresses2.map(x => SHA256(x));

// Create a Merkle tree using the "bad" leaf nodes
const badTree = new MerkleTree(badLeaves, SHA256);

// Select the second address in the "bad" addresses array and hash it to generate its leaf node
const badLeaf = SHA256(addresses2[1]);

// Generate the Merkle proof for the modified (bad) leaf node
const badProof = badTree.getProof(badLeaf);

// Verify if the modified address is part of the original Merkle tree
// This should return false since the modified address does not match the original tree
console.log(`Address ${addresses2[1]} is part of the tree?`, badTree.verify(badProof, badLeaf, root)); // false















//Second Example

// // Generate leaf nodes by hashing addresses
// const leafNodes = addresses.map(addr => SHA256(addr).toString());
// const merkleTree = new MerkleTree(leafNodes, SHA256);

// // Get the Merkle root
// const root = merkleTree.getRoot().toString('hex');
// console.log("Merkle Root:", root);

// // Generate proof for a specific address
// const addressToVerify = '0xF98cBc736F9b0D637b1fFDd0eF663e07d4b42661'; // Example address
// const leafToVerify = SHA256(addressToVerify).toString();
// const proof = merkleTree.getProof(leafToVerify);

// // Verify the proof
// const isValid = merkleTree.verify(proof, leafToVerify, root);
// console.log(`Address ${addressToVerify} is part of the tree?`, isValid);