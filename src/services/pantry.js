import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "./firebase";

export async function addPantryItem(userId, item) {
  const pantryRef = collection(db, "users", userId, "pantry");

  await addDoc(pantryRef, {
    ...item,
    createdAt: serverTimestamp(),
  });
}

export async function getPantryItems(userId) {
  const pantryRef = collection(db, "users", userId, "pantry");

  const q = query(pantryRef, orderBy("createdAt", "desc"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function deletePantryItem(userId, itemId) {
  const itemRef = doc(db, "users", userId, "pantry", itemId);

  await deleteDoc(itemRef);
}

export async function updatePantryItem(userId, itemId, item) {
  const itemRef = doc(db, "users", userId, "pantry", itemId);

  await updateDoc(itemRef, {
    ...item,
  });
}