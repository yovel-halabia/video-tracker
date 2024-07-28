import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
	selector: "app-button",
	templateUrl: "./button.component.html",
	styleUrls: ["./button.component.css"],
})
export class ButtonComponent {
	@Input() label = "";
	@Input() icon = "";

	@Output() onClick = new EventEmitter();
}
