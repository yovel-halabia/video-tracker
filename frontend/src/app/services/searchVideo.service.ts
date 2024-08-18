import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import HttpOptions from "src/assets/utils/HttpOptions";
import {Observable} from "rxjs";
import Video from "src/assets/Interfaces/Video";
import {environment} from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class SearchVideoService {
	private baseUrl = environment.baseUrl + "/search";
	constructor(private http: HttpClient) {}
	searchForVideo(query: string): Observable<Video[]> {
		return this.http.get<Video[]>(`${this.baseUrl}?query=${query}`, HttpOptions);
	}
}
