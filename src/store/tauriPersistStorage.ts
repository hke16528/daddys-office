import { Store } from "@tauri-apps/plugin-store";
import type { StateStorage } from "zustand/middleware";

const STORE_PATH = "document-store.json";

let storePromise: Promise<Store> | null = null;

const getStore = () => {
  storePromise ??= Store.load(STORE_PATH, { autoSave: true, defaults: {} });

  return storePromise;
};

const getFallbackStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
};

export const tauriPersistStorage: StateStorage = {
  async getItem(name) {
    try {
      const store = await getStore();
      return (await store.get<string>(name)) ?? null;
    } catch {
      return getFallbackStorage()?.getItem(name) ?? null;
    }
  },
  async setItem(name, value) {
    try {
      const store = await getStore();
      await store.set(name, value);
      await store.save();
    } catch {
      getFallbackStorage()?.setItem(name, value);
    }
  },
  async removeItem(name) {
    try {
      const store = await getStore();
      await store.delete(name);
      await store.save();
    } catch {
      getFallbackStorage()?.removeItem(name);
    }
  },
};
