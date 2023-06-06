# ethernaut-x-hardhat

My solutions to the [Ethernaut](https://ethernaut.openzeppelin.com/) challenges using Hardhat.

## Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/Autosaida/ethernaut-x-hardhat.git
   ```

2. Install the dependencies:

   ```bash
   cd ethernaut-x-hardhat
   npm install
   ```

3. Create a new `.env` file with your own private key and RPC endpoint, following the example provided in `.env.example`.

4. Optional: Modify the `hardhat.config.ts` file to use a different node provider or testnet. By default, it uses the Infura node and Sepolia testnet.

## Usage

The `contracts` directory contains all the contract files, and the `scripts` directory contains the scripts used to interact with the contracts.

To test the solutions locally on a forked network, use the following command:

```bash
npx hardhat run ./scripts/01-Fallback.ts
```

To run on the testnet, specify the network as follows:

```bash
npx hardhat run ./scripts/01-Fallback.ts --network sepolia
```

Please note that you should set the `instance_address` in the scripts to the address of the specific challenge contract you want to interact with.

Happy hacking!