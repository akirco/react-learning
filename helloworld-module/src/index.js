import ReactDom from "react-dom/client";

const root = ReactDom.createRoot(document.getElementById("root"));

const app = (
  <div>
    <h1>这是一个React项目</h1>
  </div>
);

root.render(app);
