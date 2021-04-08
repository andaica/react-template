import sidebar from "../../shared/container/sidebar";
import About from "./about";

const AboutModule = () => {
  sidebar.addMenu({
    index: 5,
    name: "About",
    path: "/about",
    view: <About />,
    addToRoot: false,
  });
};

export default AboutModule;
