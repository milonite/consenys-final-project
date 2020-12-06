import { Contract } from '@ethersproject/contracts'
import { useMemo } from 'react'
import { getContract } from '../utils'
import { useActiveWeb3React } from './index'
import {ArtPieceOneAddress,OkazzPollockAddress} from '../constants'
import MIGRATOR_ABI from '../constants/ArtPieceOne.json'

// returns null on errors
function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useArtPieceOne(): Contract | null {
  return useContract(ArtPieceOneAddress, MIGRATOR_ABI.abi, true)
}

export function useOkazzPollock(): Contract | null {
  return useContract(OkazzPollockAddress, MIGRATOR_ABI.abi, true)
}