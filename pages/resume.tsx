// import Link from "next/link";
import { Fragment } from "react";

import Navigation from "../src/../src/components/Navigation";
import resumeData from "../static/resume.json";
import { singular, plural } from "pluralize";
import {
  supportedType,
  dtToJSX,
  work,
  education,
  skill,
  dates,
  frontMatter,
  sidebarT
} from "../src/components/resumeTypes";
import _Head from "../src/components/ResumeHead";
import { getForDataType, titular, dateToMonthAndYear } from "../utility";
import ResumeSidebar from "../src/components/ResumeSidebar";
import { isArray } from "util";

// Same level, different handlers based on data.

const l3 = (header: work, detail: work, index?: number) => {
  const dataTypes: dtToJSX = {
    header: {
      default: ({
        position,
        company,
        website,
        title,
        startDate,
        endDate
      }: work & dates) => {
        const withTitle = (
          <strong>{website ? <a href={website}>{title}</a> : title}</strong>
        );

        const withCompany = (
          <Fragment>
            <strong>{position}</strong> at{" "}
            {website ? (
              <a href={website}>{company}:</a>
            ) : (
              <strong>{company}:</strong>
            )}
          </Fragment>
        );
        const withDates = startDate && (
          <>
            {dateToMonthAndYear(startDate)} to{" "}
            {dateToMonthAndYear(endDate) || "Present"}
          </>
        );

        return (
          <>
            {title ? withTitle : withCompany}{" "}
            <span className={"push_right"}>{withDates}</span>
          </>
        );
      }
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
      }
    }
  };

  const header_fx = (header: supportedType, index?: number) => {
    return (
      <p className="heading" style={index !== 0 ? {} : { marginTop: "1em" }}>
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
  detail: work,
  index: number
) => {
  const header_fx = (
    { title, subtitle }: { title?: string; subtitle?: dates },
    index: number
  ) => title && <div className="content-cat big-text">{titular(title)}</div>;

  return (
    <div className="" key={index}>
      {header_fx(header, index)}
      <div className="content-text work-listing education-listing">
        {l3(detail, detail, index)}
      </div>
    </div>
  );
};

const l1 = (title: string, detail: work[], i: number) => {
  const [first, ...rest] = detail.filter(d => !d.ignore);

  const dataTypes: dtToJSX = {
    header: {
      default: (head: work & dates) => l2({ title, subtitle: head }, head, 0)
    },
    details: {
      default: (rest: (work & dates)[]) => (
        <>{rest.map((d, i) => l2({ subtitle: d }, d, i + 1))}</>
      )
    }
  };

  return (
    <section className="content" key={i}>
      {getForDataType(dataTypes, "header", first.type)(first)}
      {rest.length
        ? getForDataType(dataTypes, "details", rest[0].type)(rest)
        : undefined}
    </section>
  );
};

//page
const resume = (
  header: frontMatter,
  detail: [string, work[]][],
  sidebar: [string, supportedType[]][]
) => {
  const Header_fx = ({
    header: { picture, label, name }
  }: {
    header: frontMatter;
  }) => {
    return (
      <header className="tc">
        <div className="header-content">
          {picture && (
            <div className="header-pic">
              <img src={picture} className="pic" />
            </div>
          )}
          <div className="header-text">
            <p>{titular(name)}</p>
            <p className="subtitle">{label}</p>
          </div>
        </div>
      </header>
    );
  };

  const detail_fx = (detail: [string, work[]][]) => {
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
      <_Head name={header.name} />
      <Navigation left shrink />
      <div className="resume-wrapper">
        <article className="paper">
          <Header_fx header={header} />
          <div className="flex_row">
            {ResumeSidebar(sidebar)}
            {detail_fx(detail)}
          </div>
        </article>
      </div>
    </>
  );
};

const sidebarNames = new Set(["skills", "education", "contact", "basics"]);

// clearly the following function could use a refactor.

export const readables: { [name: string]: string } = {
  basics: "contact"
};

export default () =>
  resume(
    resumeData.basics as frontMatter,
    Object.entries(resumeData)
      .filter(([k]: [string, any]) => !sidebarNames.has(k))
      .map(
        ([k, vs]: [string, any]): [string, work[]] => {
          return [k, vs.map((v: any) => ({ type: singular(k), ...v }))];
        }
      ),
    Object.entries(resumeData)
      .filter(([k]: [string, any]) => {
        return sidebarNames.has(k);
      })
      .map(
        ([k, vs]: [string, any]): [string, supportedType[]] => {
          const typeName = readables[k] || k;
          const vals =
            typeName === "contact"
              ? { ...vs, label: undefined, name: undefined }
              : vs;

          return [
            k,
            isArray(vals)
              ? vals.map((v: any) => ({
                  type: singular(typeName),
                  ...v
                }))
              : [{ type: singular(typeName), ...vals }]
          ];
        }
      )
  );
