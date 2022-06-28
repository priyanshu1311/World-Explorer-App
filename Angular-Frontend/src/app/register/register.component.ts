import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { FormGroup,ReactiveFormsModule , FormControl, Validators, MinLengthValidator } from '@angular/forms';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  genderForm: FormGroup;
  emailId: FormControl;
  userName: FormControl;
  password: FormControl;
  date: FormControl;
  gender: FormControl;
  mobileNumber: FormControl;
  image: FormControl;
  submitMessage: string;
  imageURL: string = "null";
  passwordOriginal: string;
  confirmPassword: string;

  constructor(private a: AuthService, private routerService: RouterService) { }
  fileSelected(event) {
    console.log(event);
    const file = event.target.files[0];
    console.log(file);
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event => {
      this.imageURL = reader.result.toString();
      console.log(this.imageURL);
    })
  }

  ngOnInit() {
    this.emailId = new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      this.userName = new FormControl('', [Validators.required, Validators.minLength(5)]),
      this.password = new FormControl('', [Validators.required, Validators.minLength(5)]),
      this.date = new FormControl('', Validators.required),
      this.mobileNumber = new FormControl('', Validators.required),
      this.gender = new FormControl('', Validators.required),
      this.image = new FormControl(''),

      this.registrationForm = new FormGroup({
        emailId: this.emailId,
        userName: this.userName,
        password: this.password,
        date: this.date,
        mobileNumber: this.mobileNumber,
        gender: this.gender,
        image: this.image
      });
  }

  registerSubmit() {
    console.log(this.registrationForm.value);
    // console.log(this.genderForm.value);
    var emailId = this.registrationForm.get("emailId").value;
    var password = this.registrationForm.get("password").value;
    var userName = this.registrationForm.get("userName").value;
    var date = this.registrationForm.get("date").value;
    var mobileNumber = this.registrationForm.get("mobileNumber").value;
    var gender = this.registrationForm.get("gender").value;

    if(this.imageURL == "null")
    {
      if(gender == "female")
      {
        this.imageURL= "data:image/png;base64,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";
    }

      else {
        this.imageURL = "data:image/png;base64,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";

      }
    }

    var img = this.imageURL;

    // var image = this.registrationForm.get("image");
    //this.register.image = this.imageURL;
    var user = {
      "emailId": emailId,
      "password": password,
      "userName": userName,
      "date": date,
      "mobileNumber": mobileNumber,
      "gender": gender,
      "image": img,
    }

    this.a.registerUser(user)

      this.routerService.routeToLogin();




  }
}
