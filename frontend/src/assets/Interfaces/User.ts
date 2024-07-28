interface Viedo {
	id: string;
	title: string;
	imgUrl: string;
	isDone: boolean;
	currentTime: number;
}

interface Track {
	id: number;
	label: string;
	videos: Viedo[];
}

export default interface User {
	id: number;
	userName: string;
	tracks: Track[];
}
