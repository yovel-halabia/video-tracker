import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "src/app/services/user.service";
import {AlertService} from "src/app/services/alert.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
})
export class LoginComponent {
	isLogin: boolean = true;
	submitted: boolean = false;
	errMssg: string = "";
	loginFormGroup = new FormGroup({
		userName: new FormControl(""),
		email: new FormControl("", [Validators.required, Validators.email]),
		password: new FormControl("", [Validators.required, Validators.minLength(8)]),
	});

	constructor(private router: Router, private userService: UserService, private alertService: AlertService) {
		this.loginFormGroup.valueChanges.subscribe(() => {
			this.submitted && (this.submitted = false);
			this.errMssg && (this.errMssg = "");
		});
	}

	setLogin(): void {
		this.isLogin = !this.isLogin;
		this.loginFormGroup.controls["userName"].setValidators(this.isLogin ? [] : [Validators.required]);
		this.loginFormGroup.controls["userName"].updateValueAndValidity();
	}

	onSubmit(): void {
		this.submitted = true;
		if (!this.loginFormGroup.valid) return;

		const body = {
			email: this.loginFormGroup.value.email!,
			password: this.loginFormGroup.value.password!,
			userName: this.loginFormGroup.value.userName!,
		};

		this.userService.login(body).subscribe({
			next: () => this.router.navigate(["/tracks"]),
			error: (err) => {
				if (err.status !== 400 && err.status !== 401) {
					this.alertService.show({content: err.error});
					return;
				}
				if (err.error.length === 1) {
					this.errMssg = err.error[0];
					return;
				}
				this.errMssg = `<ul class="list-disc list-inside">${err.error.map((e: string) => `<li>${e}</li>`).join("")}</ul>`;
			},
		});
	}
}
