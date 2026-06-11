import { create } from "zustand";

type SellerInfo = {
  companyName: string;
  ownerName: string;
  businessNumber: string;
  address: string;
  phone: string;
};

type DocumentState = {
  seller: SellerInfo;
  setSeller: (seller: Partial<SellerInfo>) => void;
};

export const useDocumentStore = create<DocumentState>((set) => ({
  seller: {
    companyName: "",
    ownerName: "",
    businessNumber: "",
    address: "",
    phone: "",
  },
  setSeller: (seller) =>
    set((state) => ({
      seller: {
        ...state.seller,
        ...seller,
      },
    })),
}));
