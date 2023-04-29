import {Component, inject, Inject, OnInit} from '@angular/core';
import {AlertController, IonicModule} from '@ionic/angular';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import { PaginatedResult } from 'src/app/models/paginatedResult';
import { environment } from 'src/environments/environment';
import { Car } from 'src/app/models/car';
import {Model} from "src/app/models/model";
import {Color} from "src/app/models/color";
import {TurkishCurrencyPipe} from "src/app/pipes/turkish-currency.pipe";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, HttpClientModule, CommonModule, TurkishCurrencyPipe],
})
export class Tab1Page implements OnInit{
  paginatedCarResult: PaginatedResult<Car>
  paginatedModelResult: PaginatedResult<Model>
  paginatedColorResult: PaginatedResult<Color>

  router: Router = inject(Router)
  constructor(private httpClient: HttpClient, private readonly alertController: AlertController, private readonly activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.getCars()
    this.getModels()
    this.getColors()
    this.activatedRoute.params.subscribe({
      next:(params) => {
        params["carId"]
      }
    })
  }

  getCars(){
    this.httpClient.get<PaginatedResult<Car>>(`${environment.apiUrl}Cars?Page=0&PageSize=10`).subscribe({
      next: (value) => {
        this.paginatedCarResult = value;
        console.log(value)
      }
    });
  }

  getModels(){
    this.httpClient.get<PaginatedResult<Model>>(`${environment.apiUrl}Models?Page=0&PageSize=10`).subscribe({
      next: (value) => {
        this.paginatedModelResult = value;
        console.log(value)

      }
    })
  }
  getColors(){
    this.httpClient.get<PaginatedResult<Color>>(`${environment.apiUrl}Colors?Page=0&PageSize=10`).subscribe({
      next: (value) => {
        this.paginatedColorResult = value;
        console.log(value)

      }
    })
  }
  //getColorName(colorId: number): string{
  //  const color = this.paginatedColorResult.items.find(c=>c.id === colorId);
  //  return color ? color.colorName: "";
  //}

  handleChange(event: any){
    const search = event.detail["value"];
    if (search)
      this.paginatedModelResult.items = this.paginatedModelResult.items.
        filter(model => model.brandName.toLowerCase().startsWith(search.toLowerCase()))
    else{
      this.getModels();
    }
  }


  favorite(id: number){
        // /tabs/tab2
  }

  goToCarDetails(carId: number){
    this.router.navigateByUrl("car-details/" + carId)
  }

}
