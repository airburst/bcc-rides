import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  // addDoc,
  getDocs,
  // doc,
  query,
  orderBy,
  FirestoreError,
} from "firebase/firestore";
import type { Ride, DbResponse } from "../../types";
// import seedData from "../../../photos.json";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};
console.log("🚀 ~ file: index.ts ~ line 20 ~ firebaseConfig", firebaseConfig); // FIXME:

class FirestoreService {
  app;
  db;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
  }

  async getRides(year: string, type: string): Promise<DbResponse<Ride>> {
    try {
      const ridesColRef = collection(this.db, "rides", year, type);
      const ridesQuery = await query(ridesColRef);
      const rides: Ride[] = [];
      const querySnapshot = await getDocs(ridesQuery);

      await querySnapshot.forEach((doc) => {
        rides.push(doc.data() as Ride);
      });
      return { data: rides };
    } catch (error: unknown) {
      console.error(error);
      return error instanceof FirestoreError
        ? { error: error.message }
        : { error: `Unable to get rides for ${year}` };
    }
  }

  // TODO: upsertRide(ride: Ride | RidePartial) { }
  // async addPhoto(gallery: string, photo: Photo): Promise<string> {
  //   try {
  //     const galleryRef = doc(this.db, `galleries/${gallery}`);
  //     const docRef = await addDoc(collection(galleryRef, "photos"), photo);
  //     return docRef.id;
  //   } catch (e: any) {
  //     console.error("Error adding photo: ", e);
  //     return e.message as string;
  //   }
  // }

  // TODO: deleteRide(id: string) { }

  // async seed() {
  //   seedData.map(({ gallery, ...photo }) => {
  //     this.addPhoto(gallery, photo);
  //   });
  // }
}

export default new FirestoreService();

// export const streamGroceryListItems = (groceryListId, snapshot, error) => {
//   const itemsColRef = collection(db, 'groceryLists', groceryListId, 'items')
//   const itemsQuery = query(itemsColRef, orderBy('created'))
//   return onSnapshot(itemsQuery, snapshot, error);
// };
