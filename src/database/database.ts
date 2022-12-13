import admin from "firebase-admin";
import credentials from "../env/nft360-db.json";
import { getFirestore } from "firebase-admin/firestore";

const app = admin.initializeApp({
  credential: admin.credential.cert(credentials as admin.ServiceAccount),
});

const db = getFirestore(app);

export enum Collection {
  Registers = "Registers",
  Profiles = "Profiles",
  Subscriptions = "Subscriptions",
  Nfts = "Nfts",
  Plans = "Plans",
}

const dbRegisters = db.collection(Collection.Registers);
const dbProfiles = db.collection(Collection.Profiles);
const dbSubscriptions = db.collection(Collection.Subscriptions);
const dbNfts = db.collection(Collection.Nfts);
const dbPlans = db.collection(Collection.Plans);

export { dbRegisters, dbProfiles, dbSubscriptions, dbNfts, dbPlans };
