import {Component} from "@angular/core";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AlertService, AlertData} from "src/app/services/alert.service";

@Component({
	selector: "app-alert",
	templateUrl: "./alert.component.html",
	styleUrls: ["./alert.component.css"],
	animations: [
		trigger("openClose", [
			state("open", style({bottom: 0})),
			transition("void => open", [animate(300, style({bottom: "0"}))]),
			transition("open => void", [animate(500, style({bottom: "-50%"}))]),
		]),
	],
})
export class AlertComponent {
	public open: boolean = false;
	public data!: AlertData;
	public timeout!: number;
	constructor(private alertService: AlertService) {
		this.alertService.open.subscribe((data) => {
			this.data = data;
			this.open = data.show || false;
			if (data.show) {
				clearTimeout(this.timeout);
				this.timeout = window.setTimeout(() => this.alertService.hide(), 3000);
			}
		});
	}
}
