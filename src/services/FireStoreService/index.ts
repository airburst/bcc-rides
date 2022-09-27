import { initializeApp } from "firebase/app";
import {
  getFirestore,
  // collection,
  // addDoc,
  // getDocs,
  // doc,
  // query,
  // orderBy,
} from "firebase/firestore";
// import type { Ride } from "../../types";
// import seedData from "../../../photos.json";

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.FIREBASE_PROJECT_ID,
};

class FireStoreService {
  app;
  db;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
  }

  // async listGalleries(): Promise<Gallery[]> {
  //   const querySnapshot = await getDocs(collection(this.db, "galleries"));
  //   const galleries: Gallery[] = [];

  //   await querySnapshot.forEach((doc) => {
  //     const { cover, caption } = doc.data();
  //     galleries.push({ folder: doc.id, cover, caption });
  //   });
  //   return galleries;
  // }

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

  // async getPhotos(gallery: string): Promise<Photo[]> {
  //   const galleryRef = doc(this.db, `galleries/${gallery}`);
  //   const photosRef = collection(galleryRef, "photos");
  //   const q = await query(photosRef, orderBy("dateTaken", "desc"));
  //   const photos: Photo[] = [];

  //   const querySnapshot = await getDocs(q);
  //   await querySnapshot.forEach((doc) => {
  //     photos.push(doc.data() as Photo);
  //   });
  //   return photos;
  // }

  // async seed() {
  //   seedData.map(({ gallery, ...photo }) => {
  //     this.addPhoto(gallery, photo);
  //   });
  // }
}

export default new FireStoreService();

// export const streamGroceryListItems = (groceryListId, snapshot, error) => {
//   const itemsColRef = collection(db, 'groceryLists', groceryListId, 'items')
//   const itemsQuery = query(itemsColRef, orderBy('created'))
//   return onSnapshot(itemsQuery, snapshot, error);
// };
