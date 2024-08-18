import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./services/user.service";
import Cookie from "src/assets/utils/cookie";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
})
export class AppComponent {
	constructor(router: Router, userService: UserService) {
		if (!Cookie.get("accessToken")) {
			router.navigate(["/login"]);
			return;
		}
		userService.getUser().subscribe({
			next: () => !router.url.includes("track") && router.navigate(["/tracks"]),
			error: () => {
				Cookie.delete("accessToken");
				router.navigate(["/login"]);
			},
		});
	}
}
