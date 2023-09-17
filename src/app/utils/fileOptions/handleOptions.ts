import {
  reportFileModal,
  shareFileModal,
  userNeedLogin,
} from '../misc/modalsToggle'

import axios from 'axios'
import { toast } from 'react-toastify'

interface IHandleReport {
  cid: string
  id: string // user id
}

export const handleReport = ({ cid, id }: IHandleReport) => {
  if (!id || id === '') {
    return userNeedLogin()
  }
  reportFileModal({ cid, name: 'name' })

  // comments: string;
  // reasons: string[];

  // Verificar si ya ha reportado,  con info de reporte,
  // y info de contacto
  // crear un modal para crear nuevo reporte. con info de reporte
  //
  // si  ya ha creado reporte puede eliminarlo o editarlo

  // if (reports.includes(cid)) {
  //   // dispatch(fetchUnfavoriteNewFile() as any);
  // } else {
  //   // dispatch(fetchFavoriteNewFile() as any);
  // }
}

interface IHandleShare {
  cid: string
  name: string
}

export const handleShareFile = ({ cid, name }: IHandleShare) => {
  return shareFileModal({
    cid,
    name,
  })
}

interface IHandleDownload {
  link: string //blob link
  type: string //file type
  name: string //file name
}

export const handleDownload = ({ link, type, name }: IHandleDownload) => {
  if (!link || link === '') return toast.error('No link')

  return axios
    .get(link, {
      responseType: 'blob',
    })
    .then((res) => {
      // download file
      const blob = new Blob([res.data], { type: type })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      // download
      document.body.appendChild(link)
      link.setAttribute('style', 'display: none')
      link.setAttribute('download', name)
      link.click()
      link.remove()
    })
}
