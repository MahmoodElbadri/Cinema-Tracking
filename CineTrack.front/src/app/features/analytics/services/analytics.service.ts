import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UserAnalyticsDto } from '../models/user-analytics-dto';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  //variables
  private apiUrl = environment.apiUrl;
  public userAnalytics = signal<UserAnalyticsDto>({} as UserAnalyticsDto);

  //injections
  private http = inject(HttpClient);

  // [HttpGet("get-user-analytics")]
  // AnalyticsController
  getUserAnalytics(){
    const url = `${this.apiUrl}/analytics/get-user-analytics`;
    return this.http.get<UserAnalyticsDto>(url).subscribe({
      next:(response)=>{
        this.userAnalytics.set(response);
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }
}
