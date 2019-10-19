import Link from "next/link";
import Navigation from "../src/components/Navigation";
import _Head from "../src/components/_Head";
import About from "./about";
const Index = () => (
  <>
    <_Head name={"Home"} />
    <div className="avenir">
      <Navigation />
      <About />
    </div>
  </>
);

export default Index;
