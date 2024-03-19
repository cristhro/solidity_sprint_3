## Hardhat Guide

#### Installation
```sh
npm install
```

#### Deployment
```sh
npx hardhat clean
npx hardhat compile
npx hardhat run ./scripts/deploySchoolCertificate.ts --network ethereum_sepolia_testnet
npx hardhat run ./scripts/deploySchoolGrades.ts --network ethereum_sepolia_testnet
```

#### Verification
```sh
npx hardhat verify --network ethereum_sepolia_testnet DEPLOYED_CONTRACT_ADDRESS
```

#### Example with Sepolia Network
```sh
npx hardhat run ./scripts/deploy.ts --network ethereum_sepolia_testnet
npx hardhat verify --network ethereum_sepolia_testnet 0x...

```
