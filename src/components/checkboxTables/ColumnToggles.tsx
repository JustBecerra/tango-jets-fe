import { useEffect } from "react";

interface ColumnTogglesProps {
  toggleColumn: (column: string) => void;
  collapsedColumns: string[];
  hiddenColumns: string[];
}

const columns = [
	{ key: "id", label: "ID" },
	{ key: "createdby", label: "Created By" },
	{ key: "price_revenue", label: "Price Revenue" },
	{ key: "type_of", label: "Type Of" },
	{ key: "associated_to", label: "Associated To" },
]

const ColumnToggles = ({
  toggleColumn,
  collapsedColumns,
  hiddenColumns,
}: ColumnTogglesProps) => {
  useEffect(() => {
    hiddenColumns.forEach((column) => {
      if (!collapsedColumns.includes(column)) {
        toggleColumn(column);
      }
    });
  }, [hiddenColumns, collapsedColumns, toggleColumn]);

  return null; // No se necesita renderizar nada
};

export default ColumnToggles;
// LOGICA PARA MOSTRAR U OCULTAR COLUMNAS DE UNA TABLA CON CHECKBOXES
// import { useState, useEffect } from "react";

// interface ColumnTogglesProps {
//   toggleColumn: (column: string) => void;
//   collapsedColumns: string[];
// }

// const columns = [
//   { key: "id", label: "ID" },
//   { key: "createdby", label: "Created By" },
//   // { key: "companion_passengers", label: "Companion Passengers" },
//   { key: "price_revenue", label: "Price Revenue" },
//   { key: "pslc", label: "PSLC" },
//   { key: "type_of", label: "Type Of" },
//   { key: "associated_to", label: "Associated To" },
// ];

// const ColumnToggles = ({
//   toggleColumn,
//   collapsedColumns,
// }: ColumnTogglesProps) => {
//   const [checkedColumns, setCheckedColumns] = useState<{
//     [key: string]: boolean;
//   }>({});
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     const initialCheckedColumns = columns.reduce((acc, col) => {
//       acc[col.key] = true;
//       return acc;
//     }, {} as { [key: string]: boolean });
//     setCheckedColumns(initialCheckedColumns);
//   }, []);

//   const handleToggle = (key: string) => {
//     setCheckedColumns((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//     toggleColumn(key);
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="px-4 py-2 bg-gray-300 rounded-lg"
//       >
//         Toggle Columns
//       </button>
//       {isOpen && (
//         <div className="absolute mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
//           {columns.map((col) => (
//             <label key={col.key} className="flex items-center gap-2 mb-2">
//               <input
//                 type="checkbox"
//                 checked={checkedColumns[col.key] || false}
//                 onChange={() => handleToggle(col.key)}
//                 className="w-4 h-4"
//               />
//               {col.label}
//             </label>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ColumnToggles;
