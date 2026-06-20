//
//
export const saveToIndexedDB = async (configData) => {
  const db = await idb.openDB("BMWConfigurator", 1, {
    upgrade(db) {
      db.createObjectStore("configs", {
        keyPath: "id",
        autoIncrement: true,
      });
    },
  });

  await db.add("configs", { ...configData, createdAt: new Date() });
};

export const getAllConfigsFromStorage = async () => {
  const db = await idb.openDB("BMWConfigurator", 1);
  return await db.getAll("configs");
};

export const deleteConfigFromStorage = async (id) => {
  const db = await idb.openDB("BMWConfigurator", 1);
  await db.delete("configs", id);
};
