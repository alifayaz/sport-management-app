'use client';
import React, { ReactNode, ElementType } from 'react';
import { mergeProps } from 'react-aria';
import { twMerge } from 'tailwind-merge';

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'body2'
  | 'caption';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  variant?: TextVariant;
  gray?: boolean;
  color?: string;
  center?: boolean;
  justify?: boolean;
  className?: string;
}

// Limit the element types to valid JSX elements
const variantTagMap: Record<TextVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  body2: 'p',
  caption: 'span',
};

const variantClassMap: Record<TextVariant, string> = {
  h1: 'lg:text-5xl text-[40px] font-semibold',
  h2: 'lg:text-[40px] text-4xl font-semibold',
  h3: 'lg:text-4xl text-[32px] font-semibold',
  h4: 'lg:text-[32px] text-2xl font-semibold',
  h5: 'lg:text-2xl text-xl font-semibold',
  h6: 'lg:text-xl text-sm font-semibold',
  body: 'lg:text-base text-sm',
  body2: 'lg:text-sm text-xs',
  caption: 'lg:text-xs text-[11px]',
};

const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  gray,
  color,
  center,
  justify,
  className,
  ...props
}) => {
  const Component: ElementType = variantTagMap[variant];

  const textColor = color ? color : gray ? 'text-gray-500' : 'text-neutral-600';

  const alignment = center ? 'text-center' : justify ? 'text-justify' : null;

  const classes = twMerge(
    variantClassMap[variant],
    textColor,
    alignment,
    className,
  );

  return (
    <Component className={classes} {...mergeProps(props)}>
      {children}
    </Component>
  );
};
export default Text;
