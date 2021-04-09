import React from "react";
import { useRouteMatch } from "react-router-dom";
import sidebar from "../../shared/container/sidebar";

function Home() {
  let match = useRouteMatch();

  for (let i = 1; i <= 3; i++) {
    sidebar.addMenu({
      index: i,
      name: "Home " + i,
      path: `${match.path}/subhome${i}`,
      view: () => <h2>Home {i}</h2>,
    });
  }

  sidebar.menu.setRootPath(sidebar.menu.menuList[0].path);

  return (
    <>
      <h2>Home</h2>
      <div style={{ display: "flex" }}>
        <div
          style={{
            padding: "10px",
            background: "#f0f0f0",
          }}
        >
          {sidebar.renderMenu()}
        </div>
        <div style={{ flex: 1, padding: "10px" }}>{sidebar.renderView()}</div>
      </div>
    </>
  );
}

export default Home;
