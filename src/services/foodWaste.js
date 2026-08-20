import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "./firebase";

export async function addFoodWaste(
  userId,
  wasteItem
) {
  const wasteRef = collection(
    db,
    "users",
    userId,
    "foodWaste"
  );

  await addDoc(wasteRef, {
    ...wasteItem,
    wastedAt: serverTimestamp(),
  });
}

export async function getFoodWaste(userId) {
  const wasteRef = collection(
    db,
    "users",
    userId,
    "foodWaste"
  );

  const wasteQuery = query(
    wasteRef,
    orderBy("wastedAt", "desc")
  );

  const snapshot = await getDocs(wasteQuery);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}