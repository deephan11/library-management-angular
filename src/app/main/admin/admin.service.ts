import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private firestore: Firestore) { }

  async getProfileData(id: any) {
    const userDocRef = doc(this.firestore, 'User', id);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      return { id: userDocSnapshot.id, ...userDocSnapshot.data() };
    } else {
      return null;
    }
  }

  async updateProfileData(id: any, obj: any) {
    const userDocRef = doc(this.firestore, 'User', id);
    return await updateDoc(userDocRef, obj);
  }

  async createBook(code: string, name: string, category: string) {
    const docRef = await addDoc(collection(this.firestore, 'Book'), {
      code: code,
      name: name,
      category: category,
      status: "available"
    });

    return docRef.id;
  }

  async updateBookData(id: any, obj: any) {
    const userDocRef = doc(this.firestore, 'Book', id);
    return await updateDoc(userDocRef, obj);
  }

  async getBooks() {
    return (
     await getDocs(query(collection(this.firestore, 'Book')))
    ).docs.map((books) => {
      return { id: books.id, ...books.data() };
    });
   }

   async getAvailableBooks() {
    const q = query(collection(this.firestore, 'Book'),
      where('status', '==', "available"));

    const querySnapshot = await getDocs(q);
    const booksData = querySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });

    return booksData;
  }

  async getUsers() {
    const q = query(collection(this.firestore, 'User'),
      where('role', '==', 'user'));

    const querySnapshot = await getDocs(q);
    const usersData = querySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });

    return usersData;
  }

  async getAvailableBooksBasedOnUser(id: string) {
    const q = query(collection(this.firestore, 'Book'),
      where('status', '==', "borrowed"),
      where('borrowed_user', '==', id));

    const querySnapshot = await getDocs(q);
    const booksData = querySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });

    return booksData;
  }

}
