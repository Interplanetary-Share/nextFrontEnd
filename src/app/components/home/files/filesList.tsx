import Card from './module/card'
import Grid from '@/app/components/general/containers/grid'
import { IFileRetrievalResponse } from '@interplanetary-share/hooks.ipfs-client/types/file'
import { useSelector } from 'react-redux'

const FilesList = () => {
  const { getFilesListResponse = [] as IFileRetrievalResponse[] } = useSelector(
    (state: any) => state.allFiles
  )

  return (
    <Grid>
      {getFilesListResponse.map((file: IFileRetrievalResponse) => {
        return <Card key={file.cid} {...file} />
      })}
    </Grid>
  )
}

export default FilesList
