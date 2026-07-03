import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebase";

export async function login() {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function logout() {
  await signOut(auth);
}