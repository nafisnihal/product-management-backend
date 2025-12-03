import admin from "firebase-admin";
import path from "path";

// Check if running in production
if (process.env.NODE_ENV === "production") {
  // Production: use environment variable
  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT || "{}"
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  // Development: use file
  const serviceAccountPath = path.join(
    __dirname,
    "../../serviceAccountKey.json"
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
  });
}

export const db = admin.firestore();
export default admin;
