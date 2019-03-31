import Link from "next/link";

const navLinks = ["projects", "blog", "about"];

export default ({
  left,
  shrink,
  links = navLinks
}: {
  links?: string[];
  left?: boolean;
  shrink?: boolean;
}) => (
  <div className="noprint">
    <header
      className={
        (!left ? "w-100 " : "") +
        (!shrink ? "ph4-m ph5-l" : "") +
        "bg-black-80 fixed ph3 pv2 pv3-ns"
      }
    >
      <nav className="f6 fw6 ttu tracked">
        {links.map((l, i) => (
          <Link key={i} href={`/${l}`}>
            <a className="link dim white dib mr3" title={l}>
              {l}
            </a>
          </Link>
        ))}
      </nav>
    </header>
  </div>
);
