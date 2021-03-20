import { Injectable } from '@angular/core';
import { MergeUsersUserCase } from 'src/app/poll/domain/use-cases/merge-users.use-case';
import { v4 as uuidv4 } from 'uuid';
import { FirebaseAuthRepository } from '../../data/firebase-auth.repository';
import { LocalStorageAuthRepository } from '../../data/localstorage-auth.repository';
import { Auth } from '../model/auth';

@Injectable()
export class SessionService {

  constructor(
    private localRepository: LocalStorageAuthRepository,
    private globalRepository: FirebaseAuthRepository,
    private migrateUsers: MergeUsersUserCase,
  ) { }

  /** creates and stores a new session */
  createSession(): Auth {
    const auth = new Auth(uuidv4());
    this.storeCredentials(auth);
    return auth;
  }

  /** creates a new session with a new user, if user already have a session, merge both */
  async storeCredentials(auth: Auth): Promise<void> {
    const oldAuth = this.localRepository.loadAuth();
    if (oldAuth) {
      this.migrateUsers.mergeUsers(oldAuth.id, auth.id);
    }
    await this.globalRepository.saveAuth(auth);
    this.localRepository.saveAuth(auth);
  }


  /** load current session data */
  loadAuth(): Auth | undefined {
    return this.localRepository.loadAuth();
  }

  /** returns current session */
  fetchAuthData(): Auth {
    return this.initAuth();
  }

  /** returns current session, if doesn't have one, creates a new session then return it */
  initAuth(): Auth {
    const auth = this.loadAuth();
    if (!auth) {
      return this.createSession();
    }
    return auth;
  }

  cleanLocalSession(): void {
    const auth = this.loadAuth();
    if (auth && !auth.anonymous) {
      this.localRepository.clearAuth();
    }
  }
}
