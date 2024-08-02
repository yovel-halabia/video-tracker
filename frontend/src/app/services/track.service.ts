import {Injectable} from "@angular/core";
import {Subject, Observable} from "rxjs";
import genereteId from "src/assets/utils/genereteId";
import Track from "../../assets/Interfaces/Track";
import Video from "src/assets/Interfaces/Video";
import {user} from "src/assets/mock";

@Injectable({
	providedIn: "root",
})
export class TrackService {
	public tracks: Track[] = user.tracks;
	public subject = new Subject();

	constructor() {
		this.calcTrackProgress();
	}

	calcTrackProgress(trackId?: number) {
		if (trackId) {
			const index = this.tracks.findIndex((t) => t.id === trackId);
			if (index === undefined) return;
			this.tracks[index].progress = Math.ceil(
				this.tracks[index].videos.length
					? ([...this.tracks[index].videos].filter((v) => v.isDone).length / this.tracks[index].videos.length) * 100 || 0
					: 0,
			);
			this.subject.next(this.tracks);
			return;
		}

		const tempTracks: Track[] = [];
		user.tracks.forEach((t) => {
			let progress: number = Math.ceil(t.videos.length ? ([...t.videos].filter((v) => v.isDone).length / t.videos.length) * 100 || 0 : 0);
			tempTracks.push({...t, progress});
		});
		this.tracks = tempTracks;
		this.subject.next(this.tracks);
	}

	getTracks(): Observable<any> {
		return this.subject.asObservable();
	}

	deleteTrack(id: number) {
		this.tracks = this.tracks.filter((t) => t.id !== id);
		this.subject.next(this.tracks);
	}

	updateTrack(track: Track) {
		const index = this.tracks.findIndex((t) => t.id === track.id);
		if (index === undefined) return;
		this.tracks[index] = {...track};
		this.subject.next(this.tracks);
	}

	addTrack(data: {label: string; videos: Video[]}) {
		const track: Track = {
			id: genereteId(),
			label: data.label,
			videos: data.videos,
			progress: 0,
			imgUrl: data.videos[0].imgUrl,
			currentVideoIndex: 0,
		};
		this.tracks.push(track);
		this.subject.next(this.tracks);
	}
}
