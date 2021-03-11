// Angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// Models
import { Blogger } from 'src/app/models/blogger';

// Services
import { BloggerServiceService } from 'src/app/services/blogger-service.service';

@Component({
  selector: 'app-bloggers',
  templateUrl: './bloggers.component.html',
  styleUrls: ['./bloggers.component.scss']
})
export class BloggersComponent implements OnInit, OnDestroy {

  bloggers: Blogger[] = [];

  constructor(
    // Private variables
    private _BloggerService: BloggerServiceService,

    // Public variables
    public snackBar: MatSnackBar
  ) {
    this._BloggerService.all();
  }

  ngOnDestroy(){
    this._BloggerService.bloggers = [];
  }

  ngOnInit(): void {
    this._BloggerService.bloggers$.subscribe(
      (data) => {

        if(data) {
          this.bloggers = data
        }
        
      }, (error) => {
        this.snackBar.open('Ocurrió un error', 'OK', {
          duration: 5000
        });
      }
    )
  }

  createBlogger() {
  
    /* 
      In this case i would opened a dialog to ask data blogger
      Open Dialog
      Close Dialog(data) -> When the dialog is closed, send the data, which is received here
    
      this._BloggerService.create(data).subscribe(
        (data) => {
          this.snackBar.open('Blogger Creado', 'OK', {
            duration: 3000
          });
        }, (error) => {
          this.snackBar.open('Ocurrió un error al crear el blogger', 'OK', {
            duration: 3000
          });
        }
      )
    */
  
  }

}
