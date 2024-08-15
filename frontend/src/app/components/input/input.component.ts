import {Component, Input} from "@angular/core";

@Component({
	selector: "app-input",
	templateUrl: "./input.component.html",
})
export class InputComponent {
	@Input() type = "text";
	@Input() placeholder = "";
	@Input() name = "";
	@Input() showErr = "";
	@Input() formRefference: any;
}
