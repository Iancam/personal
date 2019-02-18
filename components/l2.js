import Link from "next/link";
import { Fragment } from "react";

// Same level, different handlers based on data.
// overload the function

const l3 = ({ header, detail }, index) => {
  const dataTypes = {
    header: {
      education: ({ institution }) => <Fragment>{institution}</Fragment>,
      work: ({ position, company, website }) => (
        <Fragment>
          {position && <strong>{position}</strong> + "at"}
          {company && website ? (
            <strong>
              <a href={website}>{company}:</a>
            </strong>
          ) : (
            <strong>{{ company }}:</strong>
          )}
        </Fragment>
      )
    },
    detail: {
      default: ({ summary, highlights }) => {
        const highlight = (h, i) => (
          <p key={i} className="highlight">
            {h}
          </p>
        );
        return (
          <Fragment>
            <p>{summary}</p>
            {highlights.map(highlight)}
          </Fragment>
        );
      },
      education: ({ area, studyType, gpa }) => (
        <p className="highlight">
          {studyType}
          <i>
            {area} {gpa && gpa}
          </i>
        </p>
      )
    }
  };

  const header_fx = header => (
    <p className="heading" style={!index && "margin-top:2.4em;"}>
      {dataTypes.header[header.type](header)}
    </p>
  );

  const detail_fx = detail => dataTypes.detail[detail.type](detail);

  return (
    <section className={index === 0 ? "content" : "content work-content"}>
      <div className="row">
        {header_fx(header)}
        {detail_fx(detail)}
      </div>
    </section>
  );
};

const l2 = (header, detail, index) => {
  // if index === 0, header has title
  const header_fx = ({ title, subtitle: { startDate, endDate } }, index) => (
    <div className="content-cat big-text">
      {title}
      <p>
        {startDate} to {endDate || "today"}
      </p>
    </div>
  );

  return (
    <div class="content-text work-listing education-listing">
      {header_fx(header)}
      {l3(detail)}
    </div>
  );
};

export default l2;

//section
//detail: []
const l1 = (title, detail) => {
  const [first, ...rest] = detail;
  const header = l2({ title, subtitle: first }, first);
  const details = rest.map(d => l2({ subtitle: d }, d));
  return (
    <Fragment>
      {header} {details}
    </Fragment>
  );
};

//page
const l0 = ({ header, detail }) => {};
