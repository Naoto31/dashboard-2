import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  private prepValues = [] as any; 
  public offers = [] as any; 
  public searchInput = '' as string;
  public selectedValue = '' as string;

  /**
   * @param http 
   */
  constructor(private http: HttpClient) {
    this.selectedValue = 'date';
  }

  /**
   * ngOnInit
   * @async
   */
  async ngOnInit() {
  await this.getOffersData();
  this.sortOffer();
  }

  /**
   * get offers data from the website
   */
  private async getOffersData() {
    const url = 'https://truckoo-backend-aqkoiog6bq-ew.a.run.app/rest/v1/offers/active-offers';
    await this.http.get(url).toPromise().then(value => {
      this.offers = value;
      this.prepValues = value;
      return value;
    })
  }

  /**
   * filterCard
   * @public
   */
  public filterCard() {
    if (!this.searchInput) {
      this.offers = this.prepValues;
      return
    }
    const input = this.searchInput.toLowerCase();
    this.offers = this.prepValues.filter((value: any) => 
    {
     return value.title.toLowerCase().includes(input) || value.tags.includes(input);
    });
  }

  /**
   * sortOffer
   * @public
   */
  public sortOffer() {
    switch (this.selectedValue) {
      case 'date': 
        this.offers.sort((a:any, b:any) => Date.parse(b.offerPublicationDate) - Date.parse(a.offerPublicationDate) )
        break;
      
      case 'ascending': 
        this.offers.sort((a:any, b:any) => a.highestBid - b.highestBid )
        break;
      
      case 'descending':
        this.offers.sort((a:any, b:any) => b.highestBid - a.highestBid )
        break;
    }
  }

}
