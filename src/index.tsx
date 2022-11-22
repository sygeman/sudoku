import { render } from "solid-js/web";
import "@unocss/reset/tailwind.css";
import "uno.css";
import "./index.css";
import { Game } from "./components/game";

render(() => <Game />, document.getElementById("root") as HTMLElement);
