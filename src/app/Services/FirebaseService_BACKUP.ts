// import { initializeApp } from 'firebase/app';
// import {
//   addDoc,
//   collection,
//   getFirestore,
//   query,
//   where,
// } from 'firebase/firestore';
// import { getDocs } from 'firebase/firestore';
// import { Templates } from '../Common/Templates';

// const firebaseConfig = {
//   apiKey: 'AIzaSyB41dDtMt_5uLxVpCDPv0Ti4c0aCTiP7gg',
//   authDomain: 'templify-pro.firebaseapp.com',
//   projectId: 'templify-pro',
//   storageBucket: 'templify-pro.firebasestorage.app',
//   messagingSenderId: '109556032252',
//   appId: '1:109556032252:web:bfd17092f29496a1142d79',
//   measurementId: 'G-KCZ7E83M0S',
// };

// const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);

// export class FirebaseService {
//   // Add data
//   async addNewTemplate(template: any) {
//     try {
//       const docRef = await addDoc(collection(db, 'templates'), template);
//       console.log('Document written with ID: ', docRef.id);
//     } catch (e) {
//       console.error('Error adding document: ', e);
//     }
//   }

//   // Read data
//   async getTemplateById(templateId: number) {
//     const querySnapshot = await getDocs(collection(db, 'templates'));
//     const AVAILABLE_TEMPLATES: any[] = [];
//     querySnapshot.forEach((doc) => {
//       AVAILABLE_TEMPLATES.push(doc.data());
//       console.log(...AVAILABLE_TEMPLATES);
//     });
//     return AVAILABLE_TEMPLATES;
//   }

//   // Read data by type
//   async getTemplateByType(templateType: string) {
//     const querySnapshot = await getDocs(collection(db, 'templates'));
//     const AVAILABLE_TEMPLATES: any[] = [];
//     querySnapshot.forEach((doc) => {
//       // if (templateType.toLowerCase() === 'explore') {
//       //   AVAILABLE_TEMPLATES.push(doc.data());
//       // } else
//       if (
//         doc.data()['templateType'].toLowerCase() === templateType.toLowerCase()
//       ) {
//         AVAILABLE_TEMPLATES.push(doc.data());
//       }
//     });
//     console.log(...AVAILABLE_TEMPLATES);
//     return AVAILABLE_TEMPLATES;
//   }

//   // Allow read/write access to a document keyed by the user's UID
//   // service cloud.firestore {
//   //     match /databases/{database}/documents {
//   //       match /users/{uid} {
//   //         allow read, write: if request.auth != null && request.auth.uid == uid;
//   //       }
//   //     }
//   //   }
// }
