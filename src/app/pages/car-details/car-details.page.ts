import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AlertController, IonicModule} from '@ionic/angular';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.page.html',
  styleUrls: ['./car-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CarDetailsPage implements OnInit {

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly alertController: AlertController) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe({
      next: (params) => {

        this.alertController.create({
          header: "ARABA ID",
          message: params["carId"],
          buttons: ["TAMAM"]
        }).then(controller => controller.present())
      }
    })
  }
}
