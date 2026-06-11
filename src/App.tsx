import {useMemo} from "react";
import {AmountSummary} from "./components/AmountSummary";
import {ItemsTable} from "./components/ItemsTable";
import {RecipientAndSellerSection} from "./components/RecipientAndSellerSection";
import {StatementFooter} from "./components/StatementFooter";
import {StatementHeader} from "./components/StatementHeader";
import {useDocumentStore} from "./store/useDocumentStore";
import {toNumber} from "./utils/number";
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
        <main className="flex h-screen w-full flex-col overflow-hidden bg-zinc-200 text-neutral-950 print:h-auto print:overflow-visible">
            <div className="shrink-0 p-4 flex w-full justify-end print:hidden shadow-lg">
                <button
                    type="button"
                    className="rounded-md bg-neutral-950 px-4 py-2 text-sm font-medium text-white"
                    onClick={() => window.print()}
                >
                    인쇄 / PDF
                </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto flex flex-col items-center py-4 print:overflow-visible">
                <div className="statement-sheet bg-white">
                    <div className="statement-border relative ">
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
                        <AmountSummary totalAmount={totals.totalAmount}/>
                        <ItemsTable
                            items={items}
                            supplyAmount={totals.supplyAmount}
                            taxAmount={totals.taxAmount}
                            onItemChange={updateItem}
                        />
                        <StatementFooter note={note} onNoteChange={setNote}/>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default App;
