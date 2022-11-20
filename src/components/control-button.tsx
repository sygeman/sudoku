import { JSX } from "solid-js";

export const ControlButton = (props: {
  children: JSX.Element;
  disabled?: boolean;
  onClick?: () => void;
}) => (
  <button
    classList={{
      "h-8 w-8 flex items-center justify-center rounded relative": true,
      "transition-colors delay-75": true,
      "bg-slate-800/50 text-gray-400 font-medium text-xl": true,
      "hover:bg-slate-700": true,
      "disabled:opacity-20": true,
    }}
    disabled={props.disabled}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);
