export const userNeedLogin = () => {
  document.getElementById('needLogin')?.click()
  return
}

export const shareFileModal = ({ cid, name }: any) => {
  document.getElementById('shareModal')?.click()

  const hostname = window.location.hostname
  const link = hostname + '/' + cid

  const getElement = (id: string) => {
    return document.getElementById(id) as any
  }

  getElement('shareModalLink').value = link
  getElement('shareModalCID').value = cid
  getElement('ShareModalTitle').innerText = name

  return
}

export const reportFileModal = ({ cid, name }: any) => {
  document.getElementById('reportModal')?.click()

  // const getElement = (id: string) => {
  //   return document.getElementById(id) as any;
  // };

  // getElement('reportModalCID').value = cid;
  // getElement('reportModalTitle').innerText = name;

  return
}
