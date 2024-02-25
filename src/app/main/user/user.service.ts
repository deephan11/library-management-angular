import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore) { }

  async getBorrowedBooks() {
    let borrowed_user = window.localStorage.getItem('id');
    const q = query(collection(this.firestore, 'Book'),
      where('status', '==', "borrowed"),
      where('borrowed_user', '==', borrowed_user));

    const querySnapshot = await getDocs(q);
    const booksData = querySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });

    return booksData;
  }

  async updateBookData(id: any, obj: any) {
    const userDocRef = doc(this.firestore, 'Book', id);
    return await updateDoc(userDocRef, obj);
  }

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
}
