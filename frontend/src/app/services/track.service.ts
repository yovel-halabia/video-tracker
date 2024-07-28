import {Injectable} from "@angular/core";
import {Subject, Observable} from "rxjs";
import Track from "../../assets/Interfaces/Track";
import {user} from "src/assets/mock";

@Injectable({
	providedIn: "root",
})
export class TrackService {
	public tracks: Track[] = [];
	public subject = new Subject();

	constructor() {
		user.tracks.forEach((t) => {
			let progress: number = ([...t.videos].filter((v) => v.isDone).length / t.videos.length) * 100;
			let imgUrl = t.videos[0].imgUrl || "";
			this.tracks.push({id: t.id, label: t.label, progress, imgUrl});
		});
		this.subject.next(this.tracks);
	}

	getTracks(): Observable<any> {
		return this.subject.asObservable();
	}

	deleteTrack(id: number) {
		this.tracks = this.tracks.filter((t) => t.id !== id);
		this.subject.next(this.tracks);
	}
}
