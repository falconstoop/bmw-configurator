//
//

const saveToIndexedDB = async (configData) => {
  const db = await idb.openDB("BMWConfigurator", 1, {
    upgrade(db) {
      db.createObjectStore("configs", { keyPath: "id", autoIncrement: true });
    },
  });

  await db.add("configs", { ...configData, createdAt: new Date() });
};

export default saveToIndexedDB;
