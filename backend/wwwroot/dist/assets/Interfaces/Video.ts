export default interface Video {
	videoUrl: string;
	title: string;
	imgUrl: string;
	isDone: boolean;
	currentTime: number;
}

export interface VideoToEdit {
	trackId: number;
	videoUrl: string;
	title?: string;
	imgUrl?: string;
	isDone?: boolean;
	currentTime?: number;
}
