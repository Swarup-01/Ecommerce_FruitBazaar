import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./Firebase";

async function getUsersFromBackend() {
  const response = await getDocs(collection(db, "users"));
  let list = [];
  response.forEach((doc) => {
    let obj = { ...doc.data() };
    obj.id = doc.id;
    list.push(obj);
  });
  return list;
}
async function getSingleUsersFromBackend(id) {
  const docSnap = await getDoc(doc(db, "users", id));
  if (docSnap.exists()) {
    console.log(docSnap.data());
    return docSnap.data();
  } else {
    return null;
  }
}
async function addUsersToBackend(user) {
  const docRef = await addDoc(collection(db, "users"), user);
  console.log("Document written with ID: ", docRef.id);
  user.id = docRef.id;
  return user;
}
async function updateBackendUsers(user) {
  const studentRef = doc(db, "users", user.id);
  await updateDoc(studentRef, user);
}
async function deleteBackendUsers(id) {
  await deleteDoc(doc(db, "users", id));
}

export {
  getUsersFromBackend,
  getSingleUsersFromBackend,
  addUsersToBackend,
  updateBackendUsers,
  deleteBackendUsers,
};
