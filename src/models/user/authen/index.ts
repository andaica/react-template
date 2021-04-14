export type AuthenData = {
  id: number;
  token: string;
};

function saveAuthenData(data: AuthenData) {
  localStorage.setItem("authen", JSON.stringify(data));
}

function getAuthenData(): AuthenData {
  const authenData = localStorage.get("myValueInLocalStorage");
  return JSON.parse(authenData);
}

export default { saveAuthenData, getAuthenData };
