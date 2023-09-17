interface IHandlePropFile {
  cid: string
  prop: string
  userId: string
  getFile: any
  updateFile: any
}

export const handlePropFile = async ({
  cid,
  prop,
  userId,
  getFile,
  updateFile,
}: IHandlePropFile) => {
  const file = await getFile(cid, {
    showBlobUrl: false,
    showExtraProps: true,
    showInfoFile: false,
  })

  if (!file.extraProperties) file.extraProperties = {}
  if (!file.extraProperties[prop]) file.extraProperties[prop] = []
  if (!Array.isArray(file.extraProperties[prop]))
    file.extraProperties[prop] = []
  const currentProps = file.extraProperties[prop] as string[]
  const newProps = currentProps.includes(userId)
    ? currentProps.filter((id: string) => id !== userId)
    : [...currentProps, userId]

  await updateFile(cid, {
    extraProperties: {
      ...file.extraProperties,
      [prop]: [...newProps],
    },
  })

  return newProps
}
