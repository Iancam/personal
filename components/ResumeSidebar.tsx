import {
  skill,
  education,
  frontMatter,
  profile,
  location,
  supportedType
} from "./resumeTypes";

import { Fragment } from "react";
import { getForDataType } from "../utility";
import { isArray } from "util";

// import Link from "next/link";

const skill_fx: (props: any) => headDetComponent = ({
  type,
  name,
  keywords,
  ...props
}: skill) => {
  const header = undefined;
  console.log(type);

  const detail = (
    <>
      {<strong>{name}</strong>}: {keywords && keywords.join(", ")}
    </>
  );

  return { header, detail, ...props };
};

const education_fx: headDetFunction = ({
  area,
  studyType,
  gpa,
  institution
}: education) => {
  const header = <Fragment>{institution}</Fragment>;
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
  const header = undefined;
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
      {Object.entries(contact).map(([k, v], i) => {
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
  detail: JSX.Element;
  header: JSX.Element;
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
      ? v.map((val, i) => viewModel[k]({ ...val, key: i }))
      : viewModel[k](v);
    const is_array = isArray(hedDet);

    return is_array ? hedDet.map(toElement) : toElement(hedDet);
  });

  return <div className="content-cat sidenav">{elems}</div>;
};
