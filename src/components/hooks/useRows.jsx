import { useMemo } from "react";

export default function useRows(props) {
  const rows = useMemo(() => props.data, []);

  return rows;
}
