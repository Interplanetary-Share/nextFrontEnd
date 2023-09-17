interface PdfProps {
  url: string
}

const Pdf = ({ url }: PdfProps) => {
  return <iframe className="w-full h-screen" src={url} />
}

export default Pdf
