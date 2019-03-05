import {
  skill,
  education,
  frontMatter,
  profile,
  location,
  supportedType
} from "./resumeTypes";
import { getForDataType, titular } from "../utility";
import { readables } from "../pages/resume";

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
  const header = titular(institution, "l4_header");

  const detail = (
    <p>
      {studyType}{" "}
      <i>
        {area} {gpa && gpa}
      </i>
    </p>
  );
  return { header, detail };
};

const contact_fx: headDetFunction = (contact: frontMatter) => {
  const header = undefined;
  const link_fx = (s: string, url?: string) => (
    <p>
      <a href={url || s}>{s}</a>
    </p>
  );
  const detailMapper = {
    profiles: (profiles: profile[]) => (
      <div className="content-text work-listing">
        {profiles.map((p: profile, i) => (
          <p key={i}>
            <a href={p.url} target="_blank">
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
  const toElement = (
    { header, detail }: { [s: string]: JSX.Element },
    i: number
  ) => {
    return (
      <div className="work-listing" key={i}>
        {header}
        {detail}
      </div>
    );
  };
  const elems = props
    .map(([k, v], i) => {
      return [
        k,
        v
          .map(val => viewModel[k]({ ...val, key: i }))
          .map((el, i) => toElement(el, i))
      ];
    })
    .map(([k, el], i) => (
      <div key={i}>
        {" "}
        <span className="titular big-text"> {readables[k] || k}</span>
        {el}
      </div>
    ));

  return <div className="content-cat sidenav">{elems}</div>;
};
