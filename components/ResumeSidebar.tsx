import {
  skill,
  education,
  frontMatter,
  dtToJSX,
  profile,
  location,
  supportedType
} from "./resumeTypes";

import { Fragment } from "react";
import { getForDataType } from "../utility";
import { AnyARecord } from "dns";
import { isArray } from "util";

// import Link from "next/link";

const skill_fx: (props: any) => headDetComponent = ({
  s,
  ...props
}: {
  s: skill;
}) => {
  const header = <>{s.type}</>;
  const detail = (
    <>
      {<strong>{s.name}</strong>}: {s.keywords && s.keywords.join(", ")}
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

const contact_fx: headDetFunction = (contacts: frontMatter[]) => {
  const contact = contacts[0];
  const header = <>{contact.type}</>;
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

        return <div className="work-listing">{element}</div>;
      })}
    </>
  );
  return { detail, header };
};

// type structure<T> = {
//   header?: {
//     title: () => string | JSX.Element;
//     subtitle: () => string | JSX.Element;
//   };
//   detail?: structure<keyof T> | JSX.Element;
// };

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
  skills: (sks: skill[]) => sks.map((s, i) => skill_fx({ s, key: i })),
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
    const hedDet = viewModel[k](v);
    return isArray(hedDet) ? hedDet.map(toElement) : toElement(hedDet);
  });
  console.log(elems);

  return <div className="content-cat sidenav">{elems}</div>;
};
