import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser!: any;
  constructor(private auth: Auth) {} // Inject Auth vào constructor

  async login() {
    const credential = await signInWithPopup(
      this.auth,
      new GoogleAuthProvider(),
    );
    this.currentUser = credential.user;
    console.log(credential);
  }

  async logout() {
    await this.auth.signOut();
    this.currentUser = null; //dang xuat mat di thong tin nguoi dung
  }
}
