// Angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

// Models
import { Blogger } from 'src/app/models/blogger';

// Services
import { BloggerServiceService } from 'src/app/services/blogger-service.service';

@Component({
  selector: 'app-blogger',
  templateUrl: './blogger.component.html',
  styleUrls: ['./blogger.component.scss']
})
export class BloggerComponent implements OnInit, OnDestroy {

  blogger: Blogger;
  bloggerForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    website: new FormControl(),
    picture_url: new FormControl(),
    email: new FormControl(),
    friends: new FormControl([])
  });

  constructor(
    // Private variables
    private _BloggerService: BloggerServiceService,
    private _activatedRouter: ActivatedRoute,

    // Public variables
    public snackBar: MatSnackBar
  ) {

    // Get the ID from URL param
    let idBlogger: string = this._activatedRouter.snapshot.params.id;
    this._BloggerService.get(idBlogger);

  }

  ngOnDestroy(){
    this._BloggerService.blogger = null;
  }

  ngOnInit(): void {

    this._BloggerService.blogger$.subscribe(
      (data) => {

        // data -> User returned based on id gotten from URL
        if(data){
          this.blogger = data;
          // I could send data like the parameter, but the variable blogger could be necessary with data in a future
          this.bloggerForm = this.loadForm(this.blogger);
        }

      }, (error) => {
        this.snackBar.open('Error al cargar usuario, vuelva más tarde', 'OK', {
          duration: 5000
        });
      }
    )

  }

  loadForm(blogger: Blogger): FormGroup{
    return new FormGroup({
      id: new FormControl(blogger.id),
      name: new FormControl(blogger.name),
      website: new FormControl(blogger.website),
      picture_url: new FormControl(blogger.picture_url),
      email: new FormControl(blogger.email),
      friends: new FormControl([blogger.friends])
    })
  }

  updateBlogger() {
    /* 
    Here i will use a formGroup, and trhought GetRawValue become data to type Blogger, and after send it to service
    let blogger: Blogger = bloggerForm.GetRawValue
    this._BloggerService.update(blogger).subscribe(
      (data) => {
        this.snackBar.open('Blogger actualizado', 'OK', {
          duration: 5000
        });
      }, (error) => {
        this.snackBar.open('Error al actualizar usuario, intentelo más tarde', 'OK', {
          duration: 4000
        });
      }
    )
    */
  }

}