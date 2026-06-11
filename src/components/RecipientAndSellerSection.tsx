import type { SellerInfo } from "../store/useDocumentStore";

type RecipientAndSellerSectionProps = {
  recipientName: string;
  seller: SellerInfo;
  onRecipientNameChange: (recipientName: string) => void;
  onSellerChange: (seller: Partial<SellerInfo>) => void;
};

export function RecipientAndSellerSection({
  recipientName,
  seller,
  onRecipientNameChange,
  onSellerChange,
}: RecipientAndSellerSectionProps) {
  return (
    <section className="mt-8 grid grid-cols-[38%_1fr] gap-2">
      <div className="flex flex-col justify-end px-2 pb-3">
        <div className="mt-10 flex items-end gap-3">
          <input
            className="sheet-input underline-input w-48 text-center text-lg font-semibold"
            value={recipientName}
            onChange={(event) => onRecipientNameChange(event.currentTarget.value)}
          />
          <span className="recipient-suffix pb-1 text-sm">귀하</span>
        </div>

        <p className="mt-10 text-sm">아래와 같이 계산합니다.</p>
      </div>

      <table className="info-table">
        <colgroup>
          <col className="w-7" />
          <col className="w-23" />
          <col className="w-38" />
          <col className="w-11" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th className="supplier-side" rowSpan={5}>
              <div className="flex flex-col items-center gap-4">
                <span>공</span>
                <span>급</span>
                <span>자</span>
              </div>
            </th>
            <th>등록번호</th>
            <td colSpan={3}>
              <input
                className="sheet-input w-full text-center"
                value={seller.businessNumber}
                onChange={(event) => onSellerChange({ businessNumber: event.currentTarget.value })}
              />
            </td>
          </tr>
          <tr>
            <th>상호(법인명)</th>
            <td>
              <input
                className="sheet-input w-full"
                value={seller.companyName}
                onChange={(event) => onSellerChange({ companyName: event.currentTarget.value })}
              />
            </td>
            <th>성명</th>
            <td>
              <div className="flex items-center justify-center gap-2">
                <input
                  className="sheet-input w-20 text-center"
                  value={seller.ownerName}
                  onChange={(event) => onSellerChange({ ownerName: event.currentTarget.value })}
                />
                <span className={"pe-1"}>(인)</span>
              </div>
            </td>
          </tr>
          <tr>
            <th>사업장주소</th>
            <td colSpan={3}>
              <input
                className="sheet-input w-full"
                value={seller.address}
                onChange={(event) => onSellerChange({ address: event.currentTarget.value })}
              />
            </td>
          </tr>
          <tr>
            <th>업태</th>
            <td>
              <input
                className="sheet-input w-full"
                value={seller.businessType}
                onChange={(event) => onSellerChange({ businessType: event.currentTarget.value })}
              />
            </td>
            <th>종목</th>
            <td>
              <input
                className="sheet-input w-full"
                value={seller.businessCategory}
                onChange={(event) => onSellerChange({ businessCategory: event.currentTarget.value })}
              />
            </td>
          </tr>
          <tr>
            <th>전화번호</th>
            <td colSpan={3}>
              <input
                className="sheet-input w-full text-center"
                value={seller.phone}
                onChange={(event) => onSellerChange({ phone: event.currentTarget.value })}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
