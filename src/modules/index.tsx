import homeModule from "./home";
import loginModule from "./login";
import aboutModule from "./about";

const init = (): void => {
  homeModule();
  loginModule();
  aboutModule();
};

export default init;
