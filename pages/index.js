import Link from "next/link";
import Navigation from "../components/Navigation";
import _Head from "../components/_Head";
const Index = () => (
  <>
    <_Head name={"Home"} />
    <div className="avenir">
      <Navigation />
      <div>
        <p>Hello Next.js</p>
      </div>
    </div>
  </>
);

export default Index;
