import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {
  @Output() getInitConfig: EventEmitter<any> = new EventEmitter();
  constructor( 
    // public globals: Globals
  ) { }
  page = 'home';
  // @Input() arrInitConfig; 
  ngAfterViewInit() {
    this.getInitConfig.emit({ class: '', login: false });
  }
  ngOnInit() {
    //this.getInitConfig.emit({ class: '', login: false });
    // console.log(this.arrMenuToggle.class);
    // console.log(this.arrInitConfig,'this.arrInitConfig en home');
  }
}