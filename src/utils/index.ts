import { Contract } from '@ethersproject/contracts'
import PAWZNFTABI from 'contracts/PAWZNFT.json'

export const Networks = {
  MainNet: 56,
  Testnet: 97,
  Rinkeby: 4,
  Kovan: 42,
}

export const CONTRACTS_BY_NETWORK = {
  [Networks.MainNet]: {
    PAWZNFT: {
      address: '0x914F3856C61fc0CF01B4ea6cAaD4Fe4adA217e92',
      abi: PAWZNFTABI,
    }
  },
  [Networks.Testnet]: {
    PAWZNFT: {
      address: '0x791d3D1b83dA4fdCc03e67393d78028e19771116',
      abi: PAWZNFTABI,
    }
  },
  [Networks.Rinkeby]: {
    PAWZNFT: {
      address: '0xE41367745bfA0fCeBDaB4840ED8ED7364F894943',
      abi: PAWZNFTABI,
    }
  },
  [Networks.Kovan]: {
    PAWZNFT: {
      address: '0xb8b37a2781baf1bdf074caf5ec983defe94c73af',
      abi: PAWZNFTABI,
    }
  },
}

export const currentNetwork = process.env.REACT_APP_NETWORK_ID;

export const baseApiUrl = process.env.REACT_APP_API_URL;

export function getContractInfo(name, chainId = null) {
  if (!chainId) chainId = currentNetwork;

  const contracts = CONTRACTS_BY_NETWORK?.[chainId];
  if (contracts) {
    return contracts?.[name];
  } else {
    return null;
  }
}

export function truncateWalletString(walletAddress) {
  if (!walletAddress) return walletAddress;
  const lengthStr = walletAddress.length;
  const startStr = walletAddress.substring(0, 7);
  const endStr = walletAddress.substring(lengthStr - 7, lengthStr);
  return startStr + '...' + endStr;
}

export function truncateHashString(txhash) {
  if (!txhash) return txhash;
  const lengthStr = txhash.length;
  const startStr = txhash.substring(0, 10);
  const endStr = txhash.substring(lengthStr - 10, lengthStr);
  return startStr + '...' + endStr;
}

export function getContractObj(name, chainId, provider) {
  const info = getContractInfo(name, chainId);
  return !!info && new Contract(info.address, info.abi, provider);
}

export const shorter = (str) =>
  str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str
