import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() arrMenuToggle;
  @Input() arrInitConfig; 
  // @Output() getInitConfig: EventEmitter<any> = new EventEmitter();
  arrParams = {};
  constructor(
    private router: Router
  ) { }
  toggleMenu(){
    this.arrMenuToggle.class = (this.arrMenuToggle.class == "menu-sm") ? "" : "menu-sm"; 
  }
  ngOnInit() {
    // console.log(this.arrMenuToggle.class);
    // console.log(this.arrInitConfig,'arrInitConfig desde header');
  }
  onCerrarSesion(){
    this.arrInitConfig.login = true; 
    this.arrInitConfig.class = ' login'; 
    // this.arrParams = {
    //   class: ' login',
    //   login: true  
    // }; 
    // this.getInitConfig.emit(this.arrParams);
    this.router.navigate(['login']);
    localStorage.removeItem('TOKEN');
    // console.log(this.globals.arrInitConfig);
  }
}
