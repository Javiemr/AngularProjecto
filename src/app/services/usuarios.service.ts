import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc, updateDoc, FieldValue, getFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  
  constructor(private firestore: Firestore) { }
  getUsuarios(): Observable<Usuario[]> {
    const collectionRef = collection(this.firestore, 'usuarios');
    return collectionData(collectionRef, {idField: 'id'}) as Observable<Usuario[]>;
    }
    public getUsuario(): Observable<Usuario[]> { 
      return collectionData(collection(this.firestore, 'usuarios'), {idField: 'id'} ) as Observable<Usuario[]>;
    }
    async deleteUsuario(id: string) {
      await deleteDoc(doc(this.firestore, `usuarios/${id}`));
      }
}
