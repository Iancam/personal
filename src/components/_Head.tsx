import Head from "next/head";

export default ({
  name,
  children
}: {
  name: string;
  children?: JSX.Element;
}) => (
  <Head>
    <title>{name}</title>
    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

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
    <link
      rel="stylesheet"
      href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"
    />
    {children}
  </Head>
);
