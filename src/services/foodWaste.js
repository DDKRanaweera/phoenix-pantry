import {
  collection,
  addDoc,
  serverTimestamp,
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