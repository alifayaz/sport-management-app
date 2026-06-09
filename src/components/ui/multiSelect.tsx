'use client';

import { useMemo, useRef, useState } from 'react';
import { Key } from 'react-aria';
import { Label, ListBox, ListBoxItem, Popover } from 'react-aria-components';
import Input from './input';
import Text from './text';
import Icon from './Icon';

interface IMultiSelect {
  options: { label: string; value: string }[];
  value?: string[];
  label?: string;
  description?: string;
  errorMessage?: string;
  block?: boolean;
  disabled?: boolean;
  name?: string;
  onChange?: (value: Key[]) => void;
  // class
}

export default function MultiSelect(props: IMultiSelect) {
  //==== CONSTANTS ====//
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [set, setSet] = useState<Set<Key>>(
    new Set<Key>(props.options.map(p => p.value)),
  );

  const showedVal = useMemo(() => {
    return props.options
      .reduce((res, rec) => {
        if (props.value?.includes(rec.value)) return [...res, rec.label];
        return res;
      }, [] as string[])
      .join(', ');
  }, [props.options, props.value]);

  //==== RENDER ====//
  return (
    <div>
      {props.label && <Label>{props.label}</Label>}
      <Input
        // value={props.value?.join(', ')}
        value={showedVal}
        isReadOnly
        endAdornment={{
          element: <Icon icon='arrow-down' size={20} />,
        }}
        onSelect={() => setOpen(true)}
        // onFocusChange={() => setOpen(false)}
        block
        ref={ref}
      />

      <Popover triggerRef={ref} isOpen={open} onOpenChange={setOpen}>
        <ListBox
          selectionMode='multiple'
          selectedKeys={set}
          onSelectionChange={keys => {
            if (keys === 'all') {
              setSet(new Set(props.options.map(item => item.value)));
              props?.onChange?.(props.options.map(item => item.value));
            } else {
              setSet(keys);
              const v: Key[] = [];
              keys.forEach(value => v.push(value));
              props?.onChange?.(v);
            }
          }}
          autoFocus
        >
          {props.options.map(opt => (
            <ListBoxItem key={opt.value} id={opt.value}>
              {opt.label}
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
        <Text variant='caption' slot='description'>
          {props.errorMessage}
        </Text>
      )}
    </div>
  );
}
