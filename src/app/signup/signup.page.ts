import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(
    public alertController: AlertController,
    public authService: AuthenticationService,
    public router: Router
  ) {}
  ngOnInit() {}
  signUp(email: any, password: any) {
    this.authService
      .RegisterUser(email.value, password.value)
      .then((res) => {
        // Do something here
      })
      .catch((error) => {
        this.presentAlert(error.message);
      });
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Erreur lors de la création du compte',
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
}

}
