# Block3JS

A simple Javascript UMD library for managing smart contract ABIs and Web3.js for the front-end

## Features

- Manage multiple smart contracts in session
- Export smart contracts for caching purposes
- Built in ES6
- Leverages Web3.js with all the standard benefits
- Loads ABIs automatically through Etherscan

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
```
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
