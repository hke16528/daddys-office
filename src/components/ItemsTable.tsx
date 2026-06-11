import type { StatementItem } from "../store/useDocumentStore";
import { formatNumber, toNumber } from "../utils/number";

type ItemsTableProps = {
  items: StatementItem[];
  supplyAmount: number;
  taxAmount: number;
  onItemChange: (id: string, item: Partial<StatementItem>) => void;
};

export function ItemsTable({ items, supplyAmount, taxAmount, onItemChange }: ItemsTableProps) {
  return (
    <table className="items-table">
      <thead>
        <tr>
          <th>품목명</th>
          <th>규격</th>
          <th>수량</th>
          <th>단가</th>
          <th>공급가액</th>
          <th>세액</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>
              <input
                className="sheet-input text-center"
                value={item.name}
                onChange={(event) => onItemChange(item.id, { name: event.currentTarget.value })}
              />
            </td>
            <td>
              <input
                className="sheet-input text-center"
                value={item.specification}
                onChange={(event) =>
                  onItemChange(item.id, { specification: event.currentTarget.value })
                }
              />
            </td>
            <td>
              <input
                className="sheet-input text-center"
                value={item.quantity}
                onChange={(event) => onItemChange(item.id, { quantity: event.currentTarget.value })}
              />
            </td>
            <td>
              <input
                className="sheet-input text-right"
                value={item.unitPrice}
                onChange={(event) => onItemChange(item.id, { unitPrice: event.currentTarget.value })}
              />
            </td>
            <td>
              <input
                className="sheet-input text-right"
                value={item.supplyAmount}
                onChange={(event) =>
                  onItemChange(item.id, { supplyAmount: event.currentTarget.value })
                }
              />
            </td>
            <td>
              <input
                className="sheet-input text-right"
                value={item.taxAmount}
                onChange={(event) => onItemChange(item.id, { taxAmount: event.currentTarget.value })}
              />
            </td>
          </tr>
        ))}
        <tr className="font-medium">
          <td>계</td>
          <td />
          <td>{items.reduce((sum, item) => sum + toNumber(item.quantity), 0) || ""}</td>
          <td />
          <td className="text-right">{formatNumber(supplyAmount)}</td>
          <td className="text-right">{formatNumber(taxAmount)}</td>
        </tr>
      </tbody>
    </table>
  );
}
