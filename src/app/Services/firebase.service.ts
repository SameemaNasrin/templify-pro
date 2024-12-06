import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { firebaseConfig } from '../../../environment.firebase';
import { from, Observable } from 'rxjs';
import { app } from '../../../env/environment.firebase';

const db = getFirestore(app);

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor() {}

  // Add data
  async addNewTemplate(template: any) {
    try {
      const docRef = await addDoc(collection(db, 'templates'), template);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  // Read data
  getTemplateByType(templateType: string) {
    // alert('get templates by type')
    const templatesCollection = collection(db, 'templates');
    const templatesQuery = query(
      templatesCollection,
      where('templateType', '==', templateType.toLowerCase())
    );
    return from(
      getDocs(templatesQuery).then((snapshot) =>
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      )
    );
  }

  // Read data
  getAllTemplates() {
    // alert('get all templates')
    const templatesCollection = collection(db, 'templates');

    return from(
      getDocs(templatesCollection).then((snapshot) =>
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      )
    );
  }
}
