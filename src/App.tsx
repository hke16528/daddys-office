import { useDocumentStore } from "./store/useDocumentStore";
import "./App.css";

function App() {
  const { seller, setSeller } = useDocumentStore();

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-8 text-slate-950">
      <section className="mx-auto flex max-w-5xl flex-col gap-6">
        <header className="flex items-end justify-between border-b border-slate-300 pb-4">
          <div>
            <h1 className="text-2xl font-semibold">거래명세서</h1>
            <p className="mt-1 text-sm text-slate-600">Tailwind CSS + Zustand 설정 완료</p>
          </div>
          <button className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white">
            출력 준비
          </button>
        </header>

        <div className="grid gap-4 rounded-md border border-slate-300 bg-white p-5 shadow-sm md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium">
            상호
            <input
              className="rounded-md border border-slate-300 px-3 py-2 font-normal outline-none focus:border-slate-900"
              value={seller.companyName}
              onChange={(event) => setSeller({ companyName: event.currentTarget.value })}
              placeholder="공급자 상호"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium">
            대표자
            <input
              className="rounded-md border border-slate-300 px-3 py-2 font-normal outline-none focus:border-slate-900"
              value={seller.ownerName}
              onChange={(event) => setSeller({ ownerName: event.currentTarget.value })}
              placeholder="대표자명"
            />
          </label>
        </div>
      </section>
    </main>
  );
}

export default App;
