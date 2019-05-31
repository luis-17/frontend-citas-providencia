import { Component, Input } from '@angular/core';
import { ObservableMedia, MediaChange} from '@angular/flex-layout';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 
})
export class AppComponent {
  // @Input() arrInitConfig; 
  constructor( 
    private media: ObservableMedia 
  ) { }
  
  arrInitConfig = {
    class: ' login',
    login: true,
    urlImagePerfil: null,  
  };
  arrMenuToggle = { class: "", classIconMenu: "" }; 
  public ngOnInit(): void {
    // console.log(this.arrInitConfig,'arrInitConfig desde app'); 
    this.media.asObservable()
      .subscribe((changes: MediaChange) => { 
        if( changes.mqAlias == 'sm' || changes.mqAlias == 'xs' ){
          this.arrMenuToggle.class = 'menu-sm'; 
          this.arrMenuToggle.classIconMenu = 'none'; 
        }else{
          this.arrMenuToggle.class = ''; 
          this.arrMenuToggle.classIconMenu = ''; 
        }
      });
  }
  
  onActivate(componentRef){
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
    }, 16);
    // setTimeout(function(){
    try {
      componentRef.getInitConfig.subscribe((data) => {
        console.log(this.arrInitConfig,'entraste  xdx');
        this.arrInitConfig.class = data.class; 
        this.arrInitConfig.login = data.login; 
      });
    }
    catch(error) {
      console.log(error);
    }
      
    // }, 1000);
  }
}
