import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OAuthModule } from 'angular-oauth2-oidc';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    NgxSpinnerModule.forRoot({
      type:'line-scale-party'
    }),
    OAuthModule.forRoot()
  ],
  exports: [ToastrModule, NgxSpinnerModule, OAuthModule]
})
export class SharedModule { }
