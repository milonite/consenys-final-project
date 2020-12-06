# VeryCommon

VeryCommon is the anti SuperRare.
An infinite art project and marketplace.

## Description

There are 2 main components:

- The generative art alghoritm (The "Machine") that lives in the front end but it's rapresented by an ERC-721 contract/collection.
- The generated art, rapresented by a single ERC-721

The generated art can be tokenized upon creation, this stores in the token just the entropy. This entropy can be re-used in a second moment to re-generate the same image.
All the generated art (can) have a price, this amount can be withdrawn only by the contract owner.

Also the ERC-721 con be bought/sold, if this happens all the revenue from the generated art pieces goes to the new owner.

The generative art is made by @Kgolid

## Folder structure and instructions

This is a monorepo. The contract folder contains all the smart contract with the tests, the interface folder contains the UI.
To build and run the project locally check the readmin in the corresponding folder.
