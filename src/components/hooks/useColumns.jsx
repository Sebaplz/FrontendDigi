import { useMemo } from "react";

export default function useColumns() {
  const columns = useMemo(
    () => [
      {
        Header: "Lista de Digimons",
        accessor: "name",
      },
      {
        Header: "Estado",
        accessor: "level",
      },
    ],
    []
  );

  return columns;
}
