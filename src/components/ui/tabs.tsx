import { Key } from 'react-aria';
import Button from './button';
import Text from './text';

interface ITabs {
  block?: boolean;
  value: Key;
  onChange: (value: Key) => void;
  options: { title: string; value: Key }[];

  errorMessage?: string;
}
export default function Tabs(props: ITabs) {
  //==== CONSTANTS ====//

  //==== RENDER ====//
  return (
    <div>
      {props.options.map(tab => (
        <Button
          key={tab.value}
          onPress={() => props.onChange(tab.value)}
          variant={props.value === tab.value ? 'primary' : 'primaryOutline'}
          block={props.block}
        >
          {tab.title}
        </Button>
      ))}
      {!!props?.errorMessage && (
        <Text variant='caption'>{props.errorMessage}</Text>
      )}
    </div>
  );
}
