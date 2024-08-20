import {HttpHeaders} from "@angular/common/http";
import Cookie from "./Cookie";

export default function () {
	return {
		headers: new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: `Bearer ${Cookie.get("accessToken")}`,
		}),
	};
}
