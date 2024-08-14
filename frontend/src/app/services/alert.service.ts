import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

export interface AlertData {
	title?: string;
	content: string[];
	show?: boolean;
}

@Injectable({
	providedIn: "root",
})
export class AlertService {
	data!: AlertData;
	public open = new Subject<AlertData>();

	show(data: AlertData) {
		this.data = {...data, show: true};
		this.open.next(this.data);
	}

	hide() {
		this.data = {...this.data, show: false};
		this.open.next(this.data);
	}
}
