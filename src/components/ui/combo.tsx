import { useEffect, useRef, useState } from 'react';
import {
  Button,
  ComboBox,
  Input,
  Key,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
} from 'react-aria-components';
import Text from './text';

interface ICombo {
  label?: string;
  options: { label: string; value: Key }[];
  value?: Key;
  onChange?: (value: Key | null) => void;
  description?: string;
  errorMessage?: string;
  block?: boolean;
  placeholder?: string;
  isDisabled?: boolean;
  forceLtr?: boolean;
  // className  get style from outside
}
export default function Combo(props: ICombo) {
  //==== CONSTANTS ====//
  const containerRef = useRef<HTMLDivElement>(null);
  const [inputState, setInputState] = useState('');

  useEffect(() => {
    if (!!props.value && !!props.options.length) {
      const option = props.options.find(o => o.value === props.value);
      if (typeof option !== 'undefined') {
        setInputState(option.label);
      }
    }
  }, [props.value, props.options]);

  //==== RENDER ====//
  return (
    <ComboBox
      defaultItems={props.options}
      inputValue={inputState}
      onInputChange={setInputState}
      onSelectionChange={props.onChange}
      isDisabled={props.isDisabled}
      selectedKey={props.value}
    >
      {props.label && <Label>{props.label}</Label>}
      <div ref={containerRef}>
        <Input placeholder={props.placeholder} />
        <Button>🔽</Button>
      </div>
      <Popover>
        <ListBox>
          {props.options.map(item => (
            <ListBoxItem key={item.value} id={item.value}>
              {item.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>

      {props.description && (
        <Text slot='description' variant='caption' gray>
          {props.description}
        </Text>
      )}
      {!!props?.errorMessage && (
        <Text variant='caption' color={'red'} slot='description'>
          {props.errorMessage}
        </Text>
      )}
    </ComboBox>
  );
}
