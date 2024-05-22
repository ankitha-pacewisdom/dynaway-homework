import { Component } from '@angular/core'
import { AlertController } from '@ionic/angular'
import { Asset } from '../shared/models/asset.model'
import { AssetService } from '../shared/services/asset.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  assets: Asset[] = []

  constructor(private assetService: AssetService,private alertController: AlertController) {}

  ionViewWillEnter(): void {
    this.assets = []
    this.assetService.getAll().subscribe(
      (assets) => {
        this.assets = assets;
      },
      (error) => {
        console.error('An error occurred:', error);
        this.showErrorAlert(error);
      }
    );
  }


  async showErrorAlert(error: any) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'An error occurred while fetching assets. Please try again later.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            window.location.reload();
          }
        }
      ]
    });
    await alert.present();
  }
}
