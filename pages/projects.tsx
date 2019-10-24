import _Head from "../src/components/_Head";

const projectList = [
  {
    title: "Tunxis Booking",
    link: "https://front-end-2019.ian-cam.now.sh/",
    description: `A booking platform connecting golfers and golf companies.
      Funding was cancelled before completion. This is the final result.`
  },
  {
    title: "Leaflet LatLong Mouseover",
    description: `A Leaflet tool showing the Latitude and Longitude of the 
    cursor in real time.`
  },
  {
    title: "Form DSL",
    description:
      "a small form DSL that allows for the authoring of nested forms. Handles state management and input-label mapping. "
  }
];
export default () => (
  <div className="avenir ma4">
    <_Head name="Projects" />
    {(process.env.NODE_ENV === "development"
      ? projectList
      : projectList.filter(v => v.link)
    ).map(({ title, link, description }) => {
      return (
        <>
          {link ? (
            <a className="link dim light-blue avenir" href={link || "#"}>
              <h2>{title}</h2>
            </a>
          ) : (
            <h2>{title}</h2>
          )}

          <p className="measure">{description}</p>
        </>
      );
    })}
  </div>
);
