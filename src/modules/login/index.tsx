import router from "../../core/router";
import Login from "./login";

const LoginModule = () => {
  router.addRouter({
    path: "/login",
    view: <Login />,
  });
};

export default LoginModule;
