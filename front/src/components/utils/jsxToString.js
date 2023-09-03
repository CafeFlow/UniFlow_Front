import ReactDOMServer from "react-dom/server";

export function jsxToString(component) {
  return ReactDOMServer.renderToString(component);
}
