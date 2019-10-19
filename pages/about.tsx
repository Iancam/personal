import _Head from "../src/components/_Head";
import Navigation from "../src/components/Navigation";
import Link from "next/link";
type Tach_range = 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;
type GridParams = { defaultItemWidth: Tach_range; items: JSX.Element[] };

function flexGrid({ defaultItemWidth, items }: GridParams) {
  return (
    <section className="flex justify-center">
      {items.map((item, i) => (
        <div key={i} className={`w-${defaultItemWidth} flex justify-center`}>
          {item}
        </div>
      ))}
    </section>
  );
}

export default () => (
  <>
    <_Head name={header} />
    <div className="avenir">
      <Navigation />
      <article className="pt5">
        <header className="fw2 f-5 black-50 tc ttc mb5 measure">
          {header}
        </header>
        {summary && (
          <section className="fw3 f3 black-70 flex justify-center mb4">
            <div className="w-50">{summary}</div>
          </section>
        )}
        <section className="flex justify-center">
          <Link href={detail.link}>
            <a className="link dim light-blue flex justify-center">
              <div className="fw3 f3 light-blue-70 w-30 tc">
                <h1>{detail.header}</h1>
                <p>{detail.detail}</p>
              </div>
            </a>
          </Link>
        </section>
      </article>
    </div>
  </>
);

const header = "Attention is Fascinating  .";
const summary = `What are the right questions and how do we ensure they are asked?`;
const detail = {
  header: "Resume",
  link: "resume",
  detail: ""
};
