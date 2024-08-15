import {HttpHeaders} from "@angular/common/http";
import Cookie from "./cookie";

const HttpOptions = {
	headers: new HttpHeaders({
		"Content-Type": "application/json",
		Authorization: `Bearer ${Cookie.get("accessToken")}`,
	}),
};

export default HttpOptions;
