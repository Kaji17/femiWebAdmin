import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-stats-resume',
  templateUrl: './card-stats-resume.component.html',
  styleUrls: ['./card-stats-resume.component.scss']
})
export class CardStatsResumeComponent implements OnInit {

  @Input()total: number;
  @Input()title: any;
  @Input()iconClass: any;
  @Input()icon: any;
  constructor() { }

  ngOnInit(): void {
  }

}
