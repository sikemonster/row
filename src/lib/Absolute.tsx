import React, { type HTMLAttributes, type JSX } from "react";


/**
* Absolute — wraps a single React element and forces it to be positioned absolutely
* by cloning the child and merging the style prop with { position: 'absolute', left: x, top: y }.
*
* Usage:
* <Absolute x={10} y={20}><div>...</div></Absolute>
*/


type Props = {
  x?: number;
  y?: number;
  z?: number;
  children: React.ReactElement<HTMLElement>;
  as?: keyof JSX.IntrinsicElements
};


export default function Absolute({ as = 'span', x = 0, y = 0, z = 1, children }: Props) {
  // Ensure there's exactly one child (React.Children.only will throw if not)
  const child = React.Children.only(children)

  const Component = as;

  return <Component style={{
    position: 'absolute',
    left: x + 'px',
    top: y + 'px',
    zIndex: z
  }}>
    {child}
  </Component>
}
