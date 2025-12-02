import admin from "firebase-admin";
import path from "path";

const serviceAccountPath = path.join(__dirname, "../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

export const db = admin.firestore();
export default admin;
