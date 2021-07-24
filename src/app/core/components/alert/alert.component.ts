import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @ViewChild("alert") alert!:ElementRef;
  @Output() close = new EventEmitter<void>();

  public error: any;
  public emptyString: string = '';


  constructor(private errorService: ErrorService) { }

  ngOnInit(): void {
    this.errorService.getErrorMessage().subscribe( message => { 
      if(message != this.emptyString) {
        this.error = message;
        this.alert.nativeElement.style.display = 'block';
      }    

      setTimeout(() => {
        // this.alert.nativeElement.style.display = 'none';
        // this.errorService.setErrorMessage('');
      }, 3000);
    });
  }

  onCloseClick() {
    this.close.emit();
  }

}
