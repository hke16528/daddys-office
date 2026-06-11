import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toNumber } from "../utils/number";
import { tauriPersistStorage } from "./tauriPersistStorage";

export type SellerInfo = {
  businessNumber: string;
  companyName: string;
  ownerName: string;
  address: string;
  businessType: string;
  businessCategory: string;
  phone: string;
};

export type StatementItem = {
  id: string;
  name: string;
  specification: string;
  quantity: string;
  unitPrice: string;
  supplyAmount: string;
  taxAmount: string;
};

type DocumentState = {
  statementNumber: string;
  issuedAt: string;
  recipientName: string;
  seller: SellerInfo;
  items: StatementItem[];
  note: string;
  setStatementNumber: (statementNumber: string) => void;
  setIssuedAt: (issuedAt: string) => void;
  setRecipientName: (recipientName: string) => void;
  setNote: (note: string) => void;
  setSeller: (seller: Partial<SellerInfo>) => void;
  updateItem: (id: string, item: Partial<StatementItem>) => void;
  addItem: () => void;
};

type PersistedDocumentState = Pick<
  DocumentState,
  "statementNumber" | "issuedAt" | "recipientName" | "seller" | "items" | "note"
>;

const createEmptyItem = (): StatementItem => ({
  id: crypto.randomUUID(),
  name: "",
  specification: "",
  quantity: "",
  unitPrice: "",
  supplyAmount: "",
  taxAmount: "",
});

const calculateTaxAmount = (supplyAmount: string) =>
  String(Math.round(toNumber(supplyAmount) * 0.1));

export const useDocumentStore = create<DocumentState>()(
  persist(
    (set) => ({
      statementNumber: "",
      issuedAt: "년 월 일",
      recipientName: "",
      seller: {
        businessNumber: "",
        companyName: "",
        ownerName: "",
        address: "",
        businessType: "",
        businessCategory: "",
        phone: "",
      },
      items: Array.from({ length: 19 }, () => createEmptyItem()),
      note:
        "본 거래명세표는 사업자가 월합계표에 의한 세금계산서를 발행할 경우 거래시마다 사용하는 계산서 이며 월합계로 세금계산서를 작성할 때에 반드시 포함시켜야 한다.",
      setStatementNumber: (statementNumber) => set({ statementNumber }),
      setIssuedAt: (issuedAt) => set({ issuedAt }),
      setRecipientName: (recipientName) => set({ recipientName }),
      setNote: (note) => set({ note }),
      setSeller: (seller) =>
        set((state) => ({
          seller: {
            ...state.seller,
            ...seller,
          },
        })),
      updateItem: (id, item) =>
        set((state) => ({
          items: state.items.map((row) => {
            if (row.id !== id) {
              return row;
            }

            const nextItem = { ...row, ...item };
            const shouldCalculateSupplyAmount = "quantity" in item || "unitPrice" in item;

            if (
              shouldCalculateSupplyAmount &&
              nextItem.quantity.trim() !== "" &&
              nextItem.unitPrice.trim() !== ""
            ) {
              nextItem.supplyAmount = String(
                toNumber(nextItem.quantity) * toNumber(nextItem.unitPrice),
              );
              nextItem.taxAmount = calculateTaxAmount(nextItem.supplyAmount);
            }

            if ("supplyAmount" in item && !("taxAmount" in item)) {
              nextItem.taxAmount = calculateTaxAmount(nextItem.supplyAmount);
            }

            return nextItem;
          }),
        })),
      addItem: () =>
        set((state) => ({
          items: [...state.items, createEmptyItem()],
        })),
    }),
    {
      name: "document",
      storage: createJSONStorage(() => tauriPersistStorage),
      partialize: (state): PersistedDocumentState => ({
        statementNumber: state.statementNumber,
        issuedAt: state.issuedAt,
        recipientName: state.recipientName,
        seller: state.seller,
        items: state.items,
        note: state.note,
      }),
    },
  ),
);
