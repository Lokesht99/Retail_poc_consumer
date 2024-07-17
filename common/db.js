import Dexie from "dexie";

export const db = new Dexie("genaiRetailDb");
db.version(1).stores({
  cartItems: "++id", // Primary key and indexed props
});
