# Block3JS

A simple Javascript UMD library for managing smart contract ABIs and Web3.js for the front-end

## Features

- Manage multiple smart contracts in session
- Export smart contracts for caching purposes
- Built in ES6
- Leverages Web3.js with all the standard benefits
- Loads ABIs automatically through Etherscan
- Compatible with [hdwallet-provider](@truffle/hdwallet-provider)

## Getting started

### 1. Clone and navigate to Library Package

- Clone the repo `git clone https://github.com/aa-wong/Block3.js.git`
- Git clone this repo and `cd block3`

### 2. Install dependencies

- Run `npm install` to install the library's dependencies.

### 3. Generate Library Package

- Having all the dependencies installed run `npm run build`. This command will generate two `UMD` bundles (unminified and minified) under the `dist` folder and a `CommonJS` bundle under the `lib` folder.

### 4. Copy and paste the Block3.min.js into your html

- Copy and paste the /dist/Block3.min.js file into your html and reference the javascript files
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!-- Reference library in folder directory with Block3.min.js -->
    <script type="text/javascript" src="js/Block3.min.js"></script>
  </body>
</html>
```

## APIs

### 1. Initialize the library

- Reference library from window
```javascript
const { Block3 } = window;
```
- Set Provider (optional). Providers can use HDWalletProvider or set RPC url directly. Provider can be left empty and the library will default to ethereum
```javascript

let provider = "https://mainnet.infura.io/YOUR_INFURA_API_KEY"
// or
provider = new HDWalletProvider(
  MNEMONIC,
  RPC_URL
);
```
- Initialize Block3 with provider and [Etherscan API Key](https://etherscan.io/apis)
```javascript
const block3 = new Block3({
  provider,
  apiKey: ETHERSCAN_API_KEY
});
```

### 2. Load Smart Contract

```javascript
async initContract() {
  try {
    // Create contract with contract address, network and address
    let contract = new block3.Contract({
      address: CONTRACT_ADDRESS,
      owner: OWNER_ADDRESS, // Optional parameter,
      network: NETWORK
    });
    // Load contract
    contract = await block3.loadContract(contract);
    console.log(contract);
  } catch (e) {
    console.error(e);
  }
}
```

### 3. Execute contract methods
```javascript
async executeContractMethod() {
  try {
    // make a GET request
    const res = await contract
      .methods
      .contractFunction()
      .call({ from: contract.owner });
    console.log(res);

    // make a WRITE request
    const res2 = await contract
      .methods
      .contractFunction()
      .send({ from: contract.owner, value: <Amount to send to contract> });
    console.log(res2);
  } catch (e) {
    console.error(e);
  }
}
```
