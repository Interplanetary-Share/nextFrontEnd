import { ipfsGalactFetchClient } from '@interplanetary-share/hooks.ipfs-client'
import { useEffect } from 'react'

const useGalacFetchInit = () => {
  const { init } = ipfsGalactFetchClient()
  const apiToken = process.env.NEXT_PUBLIC_GALACFETCH_API_KEY
  const appId = process.env.NEXT_PUBLIC_GALACFETCH_APP_ID
  useEffect(() => {
    if (!apiToken || !appId) return
    init(apiToken, appId)
  }, [])
}

export default useGalacFetchInit
