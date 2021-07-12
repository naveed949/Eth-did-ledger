require('dotenv').config()

const HDWalletProvider = require('truffle-hdwallet-provider')
const fs = require('fs')

 const infuraKey = 'a9f521235df94d829754f89f68101a76'

const mainnetURL = "https://mainnet.infura.io/v3/" + infuraKey
const rinkebyURL = "https://rinkeby.infura.io/v3/" + infuraKey

const walletPath = "wallet.json"
 const { mnemonic } = JSON.parse(fs.readFileSync(walletPath))

const MainnetProvider = new HDWalletProvider(mnemonic, mainnetURL)
const RinkebyProvider = new HDWalletProvider(mnemonic, rinkebyURL)
module.exports = {
  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*"       // Any network (default: none)
    },
    coverage: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*'
    },

    
    rinkeby: {
      provider: () => RinkebyProvider,
      network_id: 4,
      gas: 5500000,
      gasPrice: 5000000000, // 5 gwei
      // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    mainnet: {
      provider: () => MainnetProvider,
      network_id: 1,
      //from: addresses[0],
      gas: 5500000,
      gasPrice: 10000000000,
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    }


  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.5.4"    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  }
}
