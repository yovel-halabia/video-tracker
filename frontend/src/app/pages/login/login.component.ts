import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"],
})
export class LoginComponent {
	isLogin: boolean = true;
	submitted: boolean = false;
	loginFormGroup = new FormGroup({
		fullName: new FormControl(""),
		email: new FormControl("", [Validators.required, Validators.email]),
		password: new FormControl("", [Validators.required, Validators.minLength(8)]),
	});

	constructor(private router: Router) {
		this.loginFormGroup.valueChanges.subscribe(() => {
			this.submitted && (this.submitted = false);
		});
	}

	setLogin(): void {
		this.isLogin = !this.isLogin;
		this.isLogin
			? this.loginFormGroup.controls["fullName"].clearValidators()
			: this.loginFormGroup.controls["fullName"].setValidators([Validators.required]);
		this.loginFormGroup.controls["fullName"].updateValueAndValidity();
	}

	onSubmit(): void {
		this.submitted = true;
		if (!this.loginFormGroup.valid) return;
		//TODO: pass here user details to server and get user data
		this.router.navigate(["/"]);
	}
}
