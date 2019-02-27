import Head from "next/head";

export default ({ name }: { name: string }) => (
  <Head>
    <title>{name}</title>
    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <link
      href="http://fonts.googleapis.com/css?family=Merriweather:400,300,700"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600"
      rel="stylesheet"
      type="text/css"
    />
    <link href="/static/css/resume.css" rel="stylesheet" />
    <link href="/static/css/print.css" media="print" />
  </Head>
);
