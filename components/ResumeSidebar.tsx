import {
  skill,
  education,
  frontMatter,
  profile,
  location,
  supportedType
} from "./resumeTypes";

import { Fragment } from "react";
import { getForDataType, titular } from "../utility";
import { isArray } from "util";

// import Link from "next/link";

const skill_fx: (props: any) => headDetComponent = ({
  type,
  name,
  keywords,
  ...props
}: skill) => {
  const header = undefined;

  const detail = (
    <p>
      {name}:{" "}
      <span className="skills-listing">{keywords && keywords.join(", ")}</span>
    </p>
  );

  return { header, detail, ...props };
};

const education_fx: headDetFunction = ({
  area,
  studyType,
  gpa,
  institution
}: education) => {
  const header = titular(institution);
  const detail = (
    <p className="highlight">
      {studyType}{" "}
      <i>
        {area} {gpa && gpa}
      </i>
    </p>
  );
  return { header, detail };
};

const contact_fx: headDetFunction = (contact: frontMatter) => {
  const header = titular(contact.type);
  const link_fx = (s: string, url?: string) => (
    <p>
      <a href={url || s}>{s}</a>
    </p>
  );
  const detailMapper = {
    profiles: (profiles: profile[]) => (
      <div className="content-text work-listing">
        {profiles.map((p: profile, i) => (
          <p>
            <a key={i} href={p.url} target="_blank">
              {p.network}
            </a>
          </p>
        ))}
      </div>
    ),
    location: ({
      address,
      postalCode,
      city,
      countryCode,
      region
    }: location) => {
      return (
        <>
          <p>{address}</p>
          <p>
            {postalCode} {city}
          </p>
          <p>{region}</p>
        </>
      );
    },
    website: link_fx,
    email: link_fx,
    default: (s: string) => <p>{s}</p>
  };
  const detail = (
    <>
      {Object.entries(contact)
        .filter(([k]) => k !== "type")
        .map(([k, v], i) => {
          const element = v
            ? getForDataType({ detail: detailMapper }, "detail", k)(v)
            : undefined;

          return (
            element && (
              <div key={i} className="work-listing">
                {element}
              </div>
            )
          );
        })}
    </>
  );
  return { detail, header };
};

type headDetComponent = {
  detail?: JSX.Element;
  header?: JSX.Element;
};
// type headDetComponent = _headDetComponent;

type headDetFunction = (t: any) => headDetComponent | headDetComponent[];

type viewModel = {
  [s: string]: headDetFunction;
};

const viewModel: viewModel = {
  skills: skill_fx,
  education: education_fx,
  basics: contact_fx
};

export default (props: [string, supportedType[]][]) => {
  const toElement = ({ header, detail }: { [s: string]: JSX.Element }) => {
    return (
      <div className="work-listing">
        {header}
        {detail}
      </div>
    );
  };
  const elems = props.map(([k, v], i) => {
    const hedDet = isArray(v)
      ? v.map((val, i) => viewModel[k]({ ...val, key: i }))
      : viewModel[k](v);
    console.log(hedDet);

    return isArray(hedDet) ? hedDet.map(toElement) : toElement(hedDet);
  });

  return <div className="content-cat sidenav">{elems}</div>;
};
