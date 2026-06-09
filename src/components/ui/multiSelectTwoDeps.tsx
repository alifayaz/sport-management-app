'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Key } from 'react-aria';
// import Button from './Button';
import { useDebugValue, useMemo, useRef, useState } from 'react';
import {
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  ListBoxSection,
  Header,
} from 'react-aria-components';
import Input from './input';
import Text from './text';

interface IMultiSelectTwoDeps {
  options: { header: string; items: { label: string; value: Key }[] }[];
  value?: string[];
  label?: string;
  description?: string;
  errorMessage?: string;
  block?: boolean;
  disabled?: boolean;
  name?: string;
  onChange?: (value: Key[]) => void;
  twoDeps?: string;
  placeholder?: string;
}

export default function MultiSelectTwoDeps(props: IMultiSelectTwoDeps) {
  //==== CONSTANTS ====//
  const ref = useRef(null);
  const popoverRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [keys, setKeys] = useState<Set<Key> | 'all'>();

  const showedVal = useMemo(() => {
    if (typeof keys === 'undefined' || keys === 'all') return;
    let str = '';

    props.options.forEach(opt => {
      props.value?.forEach(item => {
        opt.items.forEach(it => {
          if (it.value === item) {
            if (str.length) {
              str += ` ,${it.label}`;
            } else {
              str += it.label;
            }
          }
        });
      });
    });

    return str;
  }, [props.options, props.value]);

  useDebugValue(keys);

  //==== RENDER ====//
  return (
    <div>
      {props.label && <Label>{props.label}</Label>}
      <Input
        // value={props.value?.join(', ')}
        value={showedVal}
        isReadOnly
        endAdornment={{
          element: <div>🔽</div>,
        }}
        onSelect={() => setOpen(true)}
        // onFocusChange={() => setOpen(false)}
        block
        ref={ref}
        placeholder={props.placeholder}
      />

      <Popover
        triggerRef={ref}
        isOpen={open}
        onOpenChange={setOpen}
        ref={popoverRef}
      >
        <ListBox
          selectionMode='multiple'
          onSelectionChange={changeKeys => {
            setKeys(changeKeys);
            if (changeKeys === 'all') {
              props.onChange?.(
                props.options.reduce((rec, res: any) => {
                  return [...res, ...rec.items.map((i: any) => i.value)];
                }, [] as any),
              );
              return;
            }
            props.onChange?.(Array.from(changeKeys));
          }}
          selectedKeys={keys}
          autoFocus
        >
          {props.options.map((opt, i) => (
            <ListBoxSection key={i}>
              <Header>{opt.header}</Header>
              {opt.items.map(item => (
                <ListBoxItem
                  key={item.value}
                  id={item.value}
                  onHoverStart={e => {
                    alert(JSON.stringify({ x: e.target }));
                  }}
                >
                  {item.label}
                </ListBoxItem>
              ))}
            </ListBoxSection>
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
