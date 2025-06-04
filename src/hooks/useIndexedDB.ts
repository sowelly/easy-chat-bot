import { useEffect, useRef, useCallback, useState } from 'react';

export function useIndexedDB<T = any>(dbName = 'chat_db', storeName = 'chats') {
  const dbRef = useRef<IDBDatabase | null>(null);
  const [ready, setReady] = useState(false);

  // 初始化
  useEffect(() => {
    const openRequest = indexedDB.open(dbName, 1);

    openRequest.onupgradeneeded = () => {
      const db = openRequest.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' });
      }
    };

    openRequest.onsuccess = () => {
      dbRef.current = openRequest.result;
      setReady(true);
    };

    openRequest.onerror = () => {
      console.error('IndexedDB open error:', openRequest.error);
    };
  }, [dbName, storeName]);

  const getStore = (mode: IDBTransactionMode) => {
    const db = dbRef.current;
    if (!db) throw new Error('Database not initialized');
    const tx = db.transaction(storeName, mode);
    return tx.objectStore(storeName);
  };

  // 添加
  const add = useCallback((data: T): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        const store = getStore('readwrite');
        const req = store.add(data);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      } catch (e) {
        reject(e);
      }
    });
  }, []);

  // 获取单条
  const getItem = useCallback((id: string): Promise<T | undefined> => {
    return new Promise((resolve, reject) => {
      try {
        const store = getStore('readonly');
        const req = store.get(id);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      } catch (e) {
        reject(e);
      }
    });
  }, []);

  // 获取所有
  const getAll = useCallback((): Promise<T[]> => {
    return new Promise((resolve, reject) => {
      try {
        const store = getStore('readonly');
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      } catch (e) {
        reject(e);
      }
    });
  }, []);

  // 更新
  const update = useCallback((id: string, updateData: Partial<T>): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        const store = getStore('readwrite');
        const getReq = store.get(id);
        getReq.onsuccess = () => {
          const oldData = getReq.result;
          if (!oldData) return reject('Item not found');

          const newData = { ...oldData, ...updateData };
          const putReq = store.put(newData);
          putReq.onsuccess = () => resolve();
          putReq.onerror = () => reject(putReq.error);
        };
        getReq.onerror = () => reject(getReq.error);
      } catch (e) {
        reject(e);
      }
    });
  }, []);

  // 删除
  const remove = useCallback((id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        const store = getStore('readwrite');
        const req = store.delete(id);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      } catch (e) {
        reject(e);
      }
    });
  }, []);

  return {
    ready,
    add,
    getItem,
    getAll,
    update,
    remove,
  };
}
