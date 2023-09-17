export interface ITag {
  name: string
  numberPosts: number
}

interface ICalculateTagsPerPage {
  widthCharater: number
  maxWith: number | undefined
  tags: Array<ITag>
}

export const calculateTagsPerPage = ({
  widthCharater,
  maxWith = 1000,
  tags,
}: ICalculateTagsPerPage) => {
  const tagsPerPage = [] as Array<Array<ITag>>
  let tagsPerPageTemp = [] as Array<ITag>
  let width = 0

  tags.forEach((tag, index) => {
    width += tag.name.length * widthCharater
    if (width >= maxWith) {
      tagsPerPage.push(tagsPerPageTemp)
      tagsPerPageTemp = []
      width = 0
    } else {
      tagsPerPageTemp.push(tag)
    }
    if (index === tags.length - 1) {
      tagsPerPage.push(tagsPerPageTemp)
    }
  })

  return tagsPerPage
}
