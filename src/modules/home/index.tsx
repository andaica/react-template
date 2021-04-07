import router from "../../core/router";
import Home from "./home";

const HomeModule = () => {
  router.addRouter({
    path: "/home",
    view: <Home />,
  });
};

export default HomeModule;
