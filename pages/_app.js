import '../styles/globals.css'
import { NextUIProvider } from '@nextui-org/react';
import { configureChains, createClient, goerli, WagmiConfig } from "wagmi";
import { EthereumClient, modalConnectors, walletConnectProvider } from "@web3modal/ethereum"
import { Web3Modal } from "@web3modal/react"
import { avalancheFuji, bscTestnet, polygon, polygonMumbai } from 'wagmi/chains'
import Navbar from './components/Navbar'
const chains = [polygonMumbai, bscTestnet, avalancheFuji, goerli];

const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "070a989445214ac9360ae108784e2f6b" }),
]);

const client = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

const ethereumClient = new EthereumClient(client, chains);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <WagmiConfig client={client}>
        <NextUIProvider>
          <Navbar></Navbar>
          <Component {...pageProps} />
        </NextUIProvider>
      </WagmiConfig>
      
      <Web3Modal
          projectId="070a989445214ac9360ae108784e2f6b"
          ethereumClient={ethereumClient}
        />
    </>
  )
}

export default MyApp
