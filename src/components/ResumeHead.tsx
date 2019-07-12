import _Head from "./_Head";

export default (props: { name: string }) => (
  <_Head {...props}>
    <>
      <link href="/static/css/resume.css" rel="stylesheet" />
      <link href="/static/css/print.css" rel="stylesheet" media="print" />
    </>
  </_Head>
);
