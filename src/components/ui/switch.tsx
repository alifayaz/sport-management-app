"use client";
import { Label, Switch as RASwitch } from "react-aria-components";
// import Button from './Button';
import Text from "./text";
import { twMerge } from "tailwind-merge";

interface ISwitch {
  value?: boolean;
  label?: string;
  description?: string;
  errorMessage?: string;
  onChange?: (value: boolean) => void;
  direction?: "row" | "col";
}

export default function Switch(props: ISwitch) {
  return (
    <RASwitch
      className={twMerge(
        `group relative flex flex-${
          props.direction || "col"
        } gap-1 justify-center w-fit text-black font-semibold text-lg`,
        props.direction === "row" && "items-center"
      )}
      isSelected={props.value}
      onChange={props.onChange}
    >
      {props.label && <Label>{props.label}</Label>}
      <div className="switch-main">
        <span className={twMerge("h-[18px] w-[18px] transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out translate-x-0",
          "group-selected:translate-x-[-100%]"
        )} /> 
      </div>

      {props.description && (
        <Text slot="description" variant="caption" gray>
          {props.description}
        </Text>
      )}

      {!!props?.errorMessage && (
        <Text variant="caption" color="text-error" slot="description">
          {props.errorMessage}
        </Text>
      )}
    </RASwitch>
  );
}
