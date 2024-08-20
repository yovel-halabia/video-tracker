import Video from "./Video";

export default interface Track {
	id: number;
	label: string;
	progress: number;
	imgUrl: string;
	videos: Video[];
	currentVideoIndex: number;
}

export interface TrackToEdit {
	id: number;
	label?: string;
	progress?: number;
	imgUrl?: string;
	videos?: Video[];
	currentVideoIndex?: number;
}
