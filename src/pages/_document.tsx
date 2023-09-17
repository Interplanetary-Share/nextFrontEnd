import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head></Head>
        <body
          style={{
            backgroundColor:
              'linear-gradient(0deg, black,black,black, white, black, black, black)',
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
