import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { rickandmorty } from '../Modelo/listado/Listado';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { GoogleAuthProvider } from "firebase/auth";

import { getAuth, signInWithPopup, OAuthProvider,signInWithRedirect, getRedirectResult } from "firebase/auth";


const provider = new OAuthProvider('microsoft.com');

  provider.setCustomParameters({
    // Optional "tenant" parameter in case you are using an Azure AD tenant.
    // eg. '8eaef023-2b34-4da1-9baa-8bc8c9d6a490' or 'contoso.onmicrosoft.com'
    // or "common" for tenant-independent tokens.
    // The default value is "common".
    prompt: 'consent',
    // redirect_uri: 'http://localhost:4200/home',
    tenant: 'b7a14df2-6d9e-4da3-91eb-c8c9c5b5129c'
  });

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  // url = environment.url;
  constructor(private http: HttpClient, private AngFire: AngularFireAuth,private db: AngularFirestore) {}

  // personajes():Observable<rickandmorty>{

  //   return this.http.get<rickandmorty>(this.url);

  // }

  login(email: string, pass: string) {
    return new Promise((resolve, rejects) => {
      this.AngFire.signInWithEmailAndPassword(email, pass)
        .then((usuario) => {
          console.log(usuario);

          resolve(usuario);
        })
        .catch((error) => {
          rejects(error);
        });
    });
  }
  registro(
    email: string,
    pass: string,
    tel: string,
    fnacimiento: string,
    nombre: string
  ) {
    return new Promise((resolve, rejects) => {
      this.AngFire.createUserWithEmailAndPassword(email, pass)
        .then((usuario) => {
          console.log(usuario);
          const id = usuario.user.uid;
          this.db.collection('/Usuarios').doc(id).set({
            tel:tel,
            fnacimiento:fnacimiento,
            nombre:nombre
          })
          resolve(usuario);
        })
        .catch((error) => {
          rejects(error);
        });
    });
  }
loginGoogle(){

  return this.AngFire.signInWithPopup(new GoogleAuthProvider())


}

//yuber.pulecio@pi.edu.co
loginMicrosoft(){ 

const auth = getAuth();
signInWithRedirect(auth, provider);




getRedirectResult(auth)
 .then((result) => {
   // User is signed in.
   // IdP data available in result.additionalUserInfo.profile.

   // Get the OAuth access token and ID Token
   const credential = OAuthProvider.credentialFromResult(result);
   const accessToken = credential.accessToken;
   const idToken = credential.idToken;
   alert(result)
 })
 .catch((error) => {
   // Handle error

 });

//  return signInWithPopup(auth, provider)
//   .then((result) => {
//     // User is signed in.
//     // IdP data available in result.additionalUserInfo.profile.

//     // Get the OAuth access token and ID Token
//     const credential = OAuthProvider.credentialFromResult(result);
//     const accessToken = credential.accessToken;
//     const idToken = credential.idToken;
//     // alert(credential);
//   })
//   .catch((error) => {
//     // Handle error.
// console.log(error)
//   });




}

}
