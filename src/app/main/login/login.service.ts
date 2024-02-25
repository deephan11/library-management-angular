import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private firestore: Firestore) { }

  async getUser(email: string, password: string) {
    const q = query(collection(this.firestore, 'User'),
      where('email', '==', email),
      where('password', '==', password));

    const querySnapshot = await getDocs(q);
    const usersData = querySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });

    return usersData;
  }

  async createUser(email: string, password: string, role: string) {
    let docRef = null;
    if(role === "user"){
      docRef = await addDoc(collection(this.firestore, 'User'), {
        email: email,
        password: password,
        role: role,
        limit: 5,
        borrowed_limit: 0,
        age: "",
        gender: "",
        name: ""
      });
    } else {
      docRef = await addDoc(collection(this.firestore, 'User'), {
        email: email,
        password: password,
        role: role
      });
    }
    return docRef.id;
  }
}
