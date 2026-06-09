import { useEffect, useState } from "react";
import {
  Key,
  Label,
  ListBox,
  ListBoxItem,
  Selection,
} from "react-aria-components";

interface IComboMulti {
  value: Key[];
  onChange: (value: Key[]) => void;
  options: Option[];
  defaultValues?: Iterable<Key>;
  description?: string;
  errorMessage?: string;
  block?: boolean;
  placeholder?: string;
  label?: string;
}
type Option = {
  name: string;
  id: Key;
};
export default function MultiSelectList(props: IComboMulti) {
  //==== CONSTANTS ====//
  const [selected, setSelected] = useState<Selection>(() => {
    if (props.defaultValues) {
      return new Set([...props.defaultValues]);
    } else {
      return new Set([]);
    }
  });

  useEffect(() => {
    if (selected === "all") {
      props.onChange(props.options.map((i) => i.id));
      return;
    }
    props.onChange(
      props.options.filter((o) => selected.has(o.id)).map((i) => i.id)
    );
  }, [selected]);

  useEffect(() => {
    // setSelected(re);
  }, [props.value]);

  //==== RENDER ====//
  return (
    <div>
      {props.label && <Label>{props.label}</Label>}

      <ListBox
        selectionMode="multiple"
        items={props.options}
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        {(section) => <ListBoxItem id={section.id}>{section.name}</ListBoxItem>}
      </ListBox>
    </div>
  );
}
