// import {
//   Column,
//   Table as RATable,
//   TableBody,
//   TableHeader,
// } from 'react-aria-components';

// //==== TYPES ====//
// interface ITableProps<TRow> {
//   rows: TRow[];
//   renderRows: React.FC<TRow & {rowIndex: number}>;
//   renderRowsMobile?: React.FC<TRow & {rowIndex: number}>;
//   paginate?: any//IRestPaginate<TRow>;
//   headerKeys: string[];
//   loading?: boolean;
//   fullWidth?: boolean;
//   variant?: 'standard' | 'gray';
// }

// export default function Table<TRow extends Record<string, any>>(
//   props: ITableProps<TRow>
// ) {
//   //==== CONSTANTS ====//
//   const { variant = 'standard' } = props;

//   //==== RENDER ====//
//   return (
//     <>
//       <RATable
//       >
//         <TableHeader
//           {...stylex.props(
//             theme,
//             styles.thead(typeof props.renderRowsMobile === 'undefined', variant)
//           )}
//         >
//           {props.headerKeys.map((key) => (
//             <Column
//               isRowHeader
//               key={key}

//               {...stylex.props(theme, styles.thtd)}
//             >
//               {key}
//             </Column>
//           ))}
//         </TableHeader>

//         <TableBody
//           {...stylex.props(
//             theme,
//             styles.tbody(
//               typeof props.renderRowsMobile === 'undefined',
//               darkLight === 'dark'
//             )
//           )}
//         >
//           {props.rows.map((row, i) => (
//             <props.renderRows
//               {...row}
//               rowIndex={i}
//               key={i + 'row-type'}
//             />
//           ))}
//         </TableBody>
//       </RATable>

//       <IfMobile>
//         {typeof props.renderRowsMobile !== 'undefined' &&
//           props.rows.map(
//             (row, i) =>
//               typeof props.renderRowsMobile !== 'undefined' && (
//                 <props.renderRowsMobile
//                   {...row}
//                   rowIndex={i}
//                   key={i + 'row-type-mobile'}
//                 />
//               )
//           )}
//       </IfMobile>

//       {!props.rows.length && !!props?.loading && (
//         <div {...stylex.props(theme, styles.noDataLoading)}>
//           <Loader />
//         </div>
//       )}

//       {/* PAGINATE */}
//       {!!props.paginate && (
//         <TablePaginate
//           data={props.paginate}
//           loading={props.loading}
//         />
//       )}
//     </>
//   );
// }

// const MOBILE = '@media (max-width: 700px)';
// //==== STYLES ====//
// const styles = stylex.create({
//   container: (isDark) => ({
//     borderRadius: GLOBAL.radius,
//     boxShadow: GLOBAL.tableShadow,
//     borderCollapse: 'collapse',
//     border: isDark
//       ? `1px solid ${COLORS.silver}`
//       : `1px solid ${COLORS.spacer}`,
//   }),
//   fullWidth: {
//     width: '100%',
//   },
//   thead: (mobile: boolean, variant) => ({
//     backgroundColor: variant === 'standard' ? COLORS.bg : null,
//     color: variant === 'gray' ? null : COLORS.textGray,
//     borderRadius: GLOBAL.radius,
//     display: {
//       default: 'table-row-group',
//       [MOBILE]: mobile ? 'table-header-group' : 'none',
//     },
//     position: 'sticky',
//     top: 0,
//     zIndex: 2,
//   }),
//   thtd: {
//     padding: SIZES.sitePadding,
//     fontWeight: 400,
//   },
//   tbody: (mobile: boolean, isDark) => ({
//     position: 'relative',
//     display: {
//       default: 'table-row-group',
//       [MOBILE]: mobile ? 'table-row-group' : 'none',
//     },
//     ':not(.noHeight) tr': {
//       height: 48,
//     },
//     ':not(.noPad) td': {
//       padding: SIZES.smallPad,
//       border: isDark
//         ? `1px solid ${COLORS.silver}`
//         : `1px solid ${COLORS.spacer}`,
//     },
//     borderCollapse: 'collapse',
//   }),
//   loading: {
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     left: 0,
//     bottom: 0,
//   },
//   noDataLoading: {
//     width: '100%',
//     minHeight: 300,
//     position: 'relative',
//   },
// });
