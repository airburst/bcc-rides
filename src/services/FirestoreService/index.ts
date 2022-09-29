import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  getDocs,
  doc,
  query,
  FirestoreError,
  orderBy,
  where,
} from "firebase/firestore";
import type { Ride, DbResponse } from "../../types";
// import seedRidesData from "../../seedRides.json";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

const handleError = (
  error: unknown,
  defaultMessage = "Error fetching data"
) => {
  console.error(error);
  return error instanceof FirestoreError
    ? { error: error.message }
    : { error: defaultMessage };
};

class FirestoreService {
  app;
  db;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
  }

  async getRides(date: string): Promise<DbResponse<Ride>> {
    try {
      const ridesColRef = collection(this.db, "rides");
      const ridesQuery = await query(
        ridesColRef,
        where("date", "<=", date),
        orderBy("date"),
        orderBy("distance", "desc")
      );
      const rides: Ride[] = [];
      const querySnapshot = await getDocs(ridesQuery);

      await querySnapshot.forEach((doc) => {
        rides.push({ id: doc.id, ...doc.data() } as Ride);
      });
      return { data: rides };
    } catch (err) {
      return handleError(err, `Unable to get rides`);
    }
  }

  async upsertRide(ride: Ride): Promise<string> {
    const isUpdate = !!ride.id;

    try {
      const ridesColRef = collection(this.db, `rides`);

      if (isUpdate) {
        const updateRef = doc(ridesColRef, ride.id!);
        await updateDoc(updateRef, ride);
        return ride.id!;
      } else {
        const docRef = await addDoc(ridesColRef, ride);
        return docRef.id;
      }
    } catch (e: any) {
      console.error("Error adding ride: ", e);
      return e.message as string;
    }
  }

  // TODO: deleteRide(id: string) { }

  // async seed() {
  //   seedRidesData.map((ride) => {
  //     this.upsertRide(ride as Ride);
  //   });
  // }
}

export default new FirestoreService();

// export const streamGroceryListItems = (groceryListId, snapshot, error) => {
//   const itemsColRef = collection(db, 'groceryLists', groceryListId, 'items')
//   const itemsQuery = query(itemsColRef, orderBy('created'))
//   return onSnapshot(itemsQuery, snapshot, error);
// };
