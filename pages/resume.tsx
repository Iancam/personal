// import Link from "next/link";
import { Fragment } from "react";
import Head from "next/head";
import Navigation from "../components/Navigation";
import resumeData from "../static/resume.json";
import { singular, plural } from "pluralize";
type content = {
  skills: skill[];
  education: education[];
  work: work[];
  projects: work[];
};

interface typed {
  type: string;
}
type skill = {
  type: "skill";
  name: string;
  level?: string;
  keywords?: string[];
};
type dates = {
  startDate: string;
  endDate?: string;
};
type location = {
  type: "location";
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
};
type work = {
  type: "work";
  title?: string;
  position: string;
  company: string;
  website?: string;
  summary?: string;
  highlights: string[];
} & dates;

type education = {
  type: "education";
  institution: string;
  area: string;
  studyType: string;
  gpa?: number;
} & dates;

type frontMatter = {
  type: "basics";
  name: string;
  picture: string;
  label: string;
  email: string;
  phone: string;
  website: string;
  location: location;
  profiles: profile[];
};

type profile = {
  network: string;
  url: string;
  username: string;
};

interface dtToJSX {
  [s: string]: {
    [s: string]: (t: any) => JSX.Element;
  };
}
type supportedType = work | education | skill; //& { type: string };

// Same level, different handlers based on data.
// overload the function

const l3 = (header: supportedType, detail: supportedType, index?: number) => {
  const dataTypes: dtToJSX = {
    header: {
      education: ({ institution }: education) => (
        <Fragment>{institution}</Fragment>
      ),
      default: ({ position, company, website, title }: work) => {
        const withTitle = (
          <>
            <strong>
              <a href={website}>{title}:</a>
            </strong>
          </>
        );
        const withCompany = (
          <Fragment>
            {position && (
              <>
                <strong>{position}</strong> at
              </>
            )}{" "}
            {company && website ? (
              <strong>
                <a href={website}>{company}:</a>
              </strong>
            ) : (
              <strong>{company}:</strong>
            )}
          </Fragment>
        );
        return title ? withTitle : withCompany;
      },
      skill: (s: skill) => (
        <>
          {<strong>{s.name}</strong>}: {s.keywords && s.keywords.join(", ")}
        </>
      )
    },
    detail: {
      default: ({ summary, highlights }: work) => {
        const highlight = (h: string, i: number) => (
          <p key={i} className="highlight">
            {h.charAt(0).toUpperCase() + h.slice(1)}
          </p>
        );
        return (
          <Fragment>
            <p>{summary}</p>
            {highlights.map(highlight)}
          </Fragment>
        );
      },
      education: ({ area, studyType, gpa }: education) => (
        <p className="highlight">
          {studyType}
          <i>
            {area} {gpa && gpa}
          </i>
        </p>
      ),
      skill: (s: skill) => <Fragment />
    }
  };

  const header_fx = (header: supportedType, index?: number) => {
    return (
      <p className="heading" style={index !== 0 ? {} : { marginTop: "2.4em" }}>
        {getForDataType(dataTypes, "header", header.type)(header)}
      </p>
    );
  };

  const detail_fx = (detail: supportedType) => (
    <div>{getForDataType(dataTypes, "detail", detail.type)(detail)}</div>
  );

  return (
    <div className={"content-text " + `${plural(header.type)}` + "-listing"}>
      {header_fx(header, index)}
      {detail_fx(detail)}
    </div>
  );
};

const l2 = (
  header: { title?: string; subtitle?: dates },
  detail: supportedType,
  index: number
) => {
  const header_fx = (
    { title, subtitle }: { title?: string; subtitle?: dates },
    index: number
  ) => (
    <div className="content-cat big-text">
      {title}
      {subtitle && subtitle.startDate && (
        <p>
          {subtitle.startDate} to {subtitle.endDate || "today"}
        </p>
      )}
    </div>
  );

  return (
    <div className="row" key={index}>
      {header_fx(header, index)}
      <div className="content-text work-listing education-listing">
        {l3(detail, detail, index)}
      </div>
    </div>
  );
};

const l1 = (title: string, detail: supportedType[], i: number) => {
  const [first, ...rest] = detail;
  const dataTypes: dtToJSX = {
    header: {
      skills: (skil: skill) => l2({ title: skil.type }, skil, i + 1),
      default: (head: supportedType & dates) =>
        l2({ title, subtitle: head }, head, 0)
    },
    details: {
      default: (rest: (supportedType & dates)[]) => (
        <>{rest.map((d, i) => l2({ subtitle: d }, d, i + 1))}</>
      )
    }
  };

  return (
    <section className="content" key={i}>
      {getForDataType(dataTypes, "header", first.type)(first)}
      {rest.length && getForDataType(dataTypes, "details", rest[0].type)(rest)}
    </section>
  );
};

function getForDataType(dataType: dtToJSX, presentation: string, type: string) {
  return dataType[presentation][type] || dataType[presentation].default;
}
//page
const resume = (header: frontMatter, detail: [string, supportedType[]][]) => {
  const header_fx = (header: frontMatter) => {
    const dataType: dtToJSX = {
      header: {
        default: (s: string) => <>{s}</>
      },
      detail: {
        profiles: (profiles: profile[]) => (
          <div className="content-text profiles-listing">
            <ul>
              {profiles.map((p: profile, i) => (
                <li key={i}>
                  <a href={p.url} target="_blank">
                    {p.network}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ),
        location: location_fx,
        default: (s: string) => <>{s}</>
      }
    };
    const { picture, label, name, ...rest } = header;
    return (
      <header>
        <div className="header-content">
          {picture && (
            <div className="header-pic">
              <img src={picture} className="pic" />
            </div>
          )}
          <div className="header-text">
            <p>{name}</p>
            <p className="subtitle">{label}</p>
          </div>
        </div>
        <div className="content-text">
          <ul>
            {Object.entries(rest).map(([k, v], i) => (
              <li key={i}>
                <ul>
                  <li>{k}</li>
                  <li>{getForDataType(dataType, "detail", k)(v)}</li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </header>
    );
  };

  const detail_fx = (detail: [string, supportedType[]][]) => {
    return (
      <div className="content-wrapper">
        {detail.map(([k, v], i) => {
          return l1(k, v, i);
        })}
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>{header.name}</title>
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
      <Navigation />
      <div className="resume-wrapper">
        <article className="paper">
          {header_fx(header)}
          {detail_fx(detail)}
        </article>
      </div>
    </>
  );
};

export default () =>
  resume(
    resumeData.basics as frontMatter,
    Object.entries(resumeData)
      .filter(([k]) => k !== "basics")
      .map(
        ([k, vs]: [string, any]): [string, supportedType[]] => [
          k,
          vs.map((v: any) => ({ type: singular(k), ...v }))
        ]
      )
  );

function location_fx({
  address,
  postalCode,
  city,
  countryCode,
  region
}: location) {
  return (
    <>
      <p>{address}</p>
      <p>
        {postalCode} {city}
      </p>
      <p>{region}</p>
    </>
  );
}
