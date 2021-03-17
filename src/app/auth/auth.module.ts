import { NgModule } from '@angular/core';
import { AuthDataModule } from './data/auth.data.module';
import { AuthDomainModule } from './domain/auth.domain.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    AuthDomainModule,
    AuthDataModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ]
})
export class AuthModule { }
