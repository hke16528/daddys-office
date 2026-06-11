import { useMemo } from "react";
import { AmountSummary } from "./components/AmountSummary";
import { ItemsTable } from "./components/ItemsTable";
import { RecipientAndSellerSection } from "./components/RecipientAndSellerSection";
import { StatementFooter } from "./components/StatementFooter";
import { StatementHeader } from "./components/StatementHeader";
import { useDocumentStore } from "./store/useDocumentStore";
import { toNumber } from "./utils/number";
import "./App.css";

function App() {
  const {
    statementNumber,
    issuedAt,
    recipientName,
    seller,
    items,
    note,
    setStatementNumber,
    setIssuedAt,
    setRecipientName,
    setNote,
    setSeller,
    updateItem,
  } = useDocumentStore();

  const totals = useMemo(() => {
    const supplyAmount = items.reduce((sum, item) => sum + toNumber(item.supplyAmount), 0);
    const taxAmount = items.reduce((sum, item) => sum + toNumber(item.taxAmount), 0);

    return {
      supplyAmount,
      taxAmount,
      totalAmount: supplyAmount + taxAmount,
    };
  }, [items]);

  return (
    <main className="min-h-screen bg-zinc-200 px-4 py-6 text-neutral-950">
      <div className="mx-auto mb-4 flex max-w-[900px] justify-end print:hidden">
        <button
          type="button"
          className="rounded-md bg-neutral-950 px-4 py-2 text-sm font-medium text-white"
          onClick={() => window.print()}
        >
          인쇄 / PDF
        </button>
      </div>

      <section className="statement-sheet mx-auto bg-white">
        <div className="statement-border relative">
          <StatementHeader
            statementNumber={statementNumber}
            issuedAt={issuedAt}
            onStatementNumberChange={setStatementNumber}
            onIssuedAtChange={setIssuedAt}
          />
          <RecipientAndSellerSection
            recipientName={recipientName}
            seller={seller}
            onRecipientNameChange={setRecipientName}
            onSellerChange={setSeller}
          />
          <AmountSummary totalAmount={totals.totalAmount} />
          <ItemsTable
            items={items}
            supplyAmount={totals.supplyAmount}
            taxAmount={totals.taxAmount}
            onItemChange={updateItem}
          />
          <StatementFooter note={note} onNoteChange={setNote} />
        </div>
      </section>
    </main>
  );
}

export default App;
