import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function addPantryItem(userId, item) {
  const pantryRef = collection(db, "users", userId, "pantry");

  await addDoc(pantryRef, {
    ...item,
    createdAt: serverTimestamp(),
  });
}