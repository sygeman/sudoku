import { Component, JSX } from "solid-js";

export const HeaderButton: Component<{
  children?: JSX.Element;
  disabled?: boolean;
  onClick?: () => void;
}> = (props) => (
  <button
    classList={{
      "flex px-2 py-0.5 rounded transition-colors delay-75": true,
      "bg-slate-800 text-gray-400 font-medium uppercase text-xs": true,
      "hover:bg-slate-700": true,
      "disabled:opacity-20": true,
    }}
    disabled={props.disabled}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);
