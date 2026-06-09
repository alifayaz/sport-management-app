'use client';
interface ISpinner {
  diameter?: number;
  fat?: number;
  color?: string;
}
export default function Spinner(props: ISpinner) {
  console.log({ props });
  //==== RENDER ====//
  return <span className='loader'></span>;
}

// const rotation = stylex.keyframes({
//   '0%': {
//     transform: 'rotate(0deg)',
//   },
//   '100%': {
//     transform: 'rotate(360deg)',
//   },
// });
// const styles = stylex.create({
//   base: (diameter: number, fat: number, color: string) => ({
//     width: `${diameter}px`,
//     height: `${diameter}px`,
//     border: `${fat}px solid white`,
//     borderBottomColor: color,
//     borderRadius: '50%',
//     display: 'inline-block',
//     boxSizing: 'border-box',
//     animation: `${rotation} 1s linear infinite`,
//   }),
// });
