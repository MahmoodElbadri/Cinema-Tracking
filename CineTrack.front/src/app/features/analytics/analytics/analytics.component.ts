import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent implements OnInit {

  private analyticsService = inject(AnalyticsService);
  protected userAnalytics = this.analyticsService.userAnalytics;

  ngOnInit(): void {
    this.analyticsService.getUserAnalytics();
  }

  formatWatchTime(minutes: number | undefined): string {
    if (!minutes) return '0 hrs 0 mins';
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs} hrs ${mins} mins`;
  }

  getMaxGenreCount(): number {
    const genres = this.userAnalytics()?.favouriteGenres;
    if (!genres || genres.length === 0) return 1;
    return Math.max(...genres.map((g: any) => g.numberOfMovies));
  }

  getMaxMonthlyCount(): number {
    const stats = this.userAnalytics()?.monthlyStats;
    if (!stats || stats.length === 0) return 1;
    return Math.max(...stats.map((s: any) => s.moviesAdded));
  }
  
  getMonthName(monthNum: number | undefined): string {
    if (!monthNum) return '';
    const date = new Date(2000, monthNum - 1, 1);
    return date.toLocaleString('default', { month: 'short' });
  }
}
