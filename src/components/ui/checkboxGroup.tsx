import { CheckboxGroup, Checkbox } from 'react-aria-components';
import Text from '@/components/ui/text';

interface ICheckboxGroup {
  options: Option[];
  onChange: (values: string[]) => void;
  values: string[];
  label?: string;
}

type Option = {
  name: string;
  value: string;
  icon?: string;
};

export default function CustomCheckboxGroup({
  onChange,
  options,
  values,
  label,
}: ICheckboxGroup) {
  return (
    <CheckboxGroup
      className='flex flex-col justify-start gap-4'
      value={values}
      onChange={newValues => onChange(newValues as string[])}
    >
      {label && <Text>{label}</Text>}
      {options.map(option => (
        <CustomCheckbox option={option} values={values} key={option.value} />
      ))}
    </CheckboxGroup>
  );
}

function CustomCheckbox({
  option,
  values,
}: {
  option: Option;
  values: string[];
}) {
  return (
    <Checkbox
      key={option.value}
      value={option.value}
      className='flex items-center'
    >
      <div className='rtl:ml-2 ltr:mr-2 cursor-pointer'>
        {values.includes(option.value) ? (
          ':('
        ) : (
          ':)'
        )}
      </div>
      {option.icon && (
        <img
          src={option.icon}
          alt={option.name}
          width={20}
          height={20}
          className='rounded-full rtl:ml-2 ltr:mr-2 border border-gray-300'
        />
      )}
      {option.name}
    </Checkbox>
  );
}
