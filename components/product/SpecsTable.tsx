import type { ProductSpecRow } from "@/lib/products/types";

export default function SpecsTable({ specs }: { specs: ProductSpecRow[] }) {
  return (
    <table className="specs-table">
      <tbody>
        {specs.map((s) => (
          <tr key={s.label}>
            <th>{s.label}</th>
            <td>{s.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
