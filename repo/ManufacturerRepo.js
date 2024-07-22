import { collection, getDocs, orderBy, query } from "firebase/firestore/lite";
import { firestore } from "../common/firebase.config";
 
export async function getManufacturers() {
  const db = firestore;
  const manufacturerSnapshot = await getDocs(
    query(collection(db, "manufaturers"), orderBy("createdAt", "desc"))
  );
 
  return manufacturerSnapshot.docs
    .map((doc) => {
      return { id: doc.id, name: doc.data().name };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}