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
      {studyType}
      <i>
        {area} {gpa && gpa}
      </i>
    </p>
  );
  return { header, detail };
};

const contact_fx: headDetFunction = (contact: frontMatter) => {
  const header = titular(contact.type);
  const detailMapper = {
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
    default: (s: string) => <>{s}</>
  };
  const detail = (
    <>
      {Object.entries(contact)
        .filter(([k]) => k !== "type")
        .map(([k, v], i) => {
          const element = getForDataType({ detail: detailMapper }, "detail", k)(
            v
          );

          return (
            <div key={i} className="work-listing">
              {element}
            </div>
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
      <>
        {header}
        {detail}
      </>
    );
  };
  const elems = props.map(([k, v], i) => {
    const hedDet = isArray(v)
      ? v.map((val, i) => viewModel[k]({ ...val, key: k }))
      : viewModel[k](v);
    console.log(hedDet);

    return isArray(hedDet) ? hedDet.map(toElement) : toElement(hedDet);
  });

  return <div className="content-cat sidenav">{elems}</div>;
};
