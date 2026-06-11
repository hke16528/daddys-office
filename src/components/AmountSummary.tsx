import { formatNumber } from "../utils/number";

type AmountSummaryProps = {
  totalAmount: number;
};

export function AmountSummary({ totalAmount }: AmountSummaryProps) {
  return (
    <div className="mt-0 flex border-y border-neutral-900 text-sm">
      <div className="px-4 py-3">(공급가액+세액)</div>
      <div className="grow px-4 py-3">금</div>
      <div className="px-4 py-3 text-right">
        {formatNumber(totalAmount)} 원
      </div>
      <div className="px-4 py-3 text-center">( ₩ {formatNumber(totalAmount)} )</div>
    </div>
  );
}
