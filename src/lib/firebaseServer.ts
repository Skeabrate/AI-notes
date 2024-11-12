import * as admin from "firebase-admin";
import serviceKey from "../../service_key.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceKey as admin.ServiceAccount),
  });
}

export const adminDb = admin.firestore();
