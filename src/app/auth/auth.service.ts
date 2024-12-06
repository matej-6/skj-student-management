import { Injectable, signal } from '@angular/core';

export const PASSWORD = '1234';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthorized = signal(false);

  isAuthorized = this._isAuthorized.asReadonly();

  private _showModal = signal(false);

  showModal = this._showModal.asReadonly();
  turnModal(val: boolean) {
    console.log('switched modal');
    this._showModal.set(val);
  }

  logIn(password: string): string | undefined {
    if (password != PASSWORD) {
      this._isAuthorized.set(false);
      return 'Hesla sa nezhoduju.';
    }

    this._isAuthorized.set(true);
    this.turnModal(false);
    return;
  }

  signOut() {
    this._isAuthorized.set(false);
  }
}
