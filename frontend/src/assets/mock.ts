import User from "./Interfaces/User";
import Video from "./Interfaces/Video";
export const user: User = {
	userName: "my user",
	tracks: [
		{
			id: 1,
			label: "track1",
			imgUrl: "https://i.ytimg.com/vi/iVIjckwltkk/mqdefault.jpg",
			progress: 0,
			currentVideoIndex: 0,
			videos: [
				{
					id: "iVIjckwltkk",
					title: "Kids At The Zoo: Compilation",
					imgUrl: "https://i.ytimg.com/vi/iVIjckwltkk/mqdefault.jpg",
					isDone: true,
					currentTime: 0,
				},
				{
					id: "mVjYG9TSN88",
					title: "Welcome to Angular’s renaissance — angular.dev",
					imgUrl: "https://i.ytimg.com/vi/mVjYG9TSN88/maxresdefault.jpg",
					isDone: false,
					currentTime: 0,
				},
			],
		},
		{
			id: 2,
			label: "track2",
			imgUrl: "https://i.ytimg.com/vi/iVIjckwltkk/mqdefault.jpg",
			progress: 0,
			currentVideoIndex: 0,
			videos: [
				{
					id: "iVIjckwltkk",
					title: "Kids At The Zoo: Compilation",
					imgUrl: "https://i.ytimg.com/vi/iVIjckwltkk/mqdefault.jpg",
					isDone: false,
					currentTime: 0,
				},
				{
					id: "mVjYG9TSN88",
					title: "Welcome to Angular’s renaissance — angular.dev",
					imgUrl: "https://i.ytimg.com/vi/mVjYG9TSN88/maxresdefault.jpg",
					isDone: false,
					currentTime: 0,
				},
			],
		},
	],
};

export const videos: Video[] = [
	{
		id: "iVIjckwltkk12",
		title: "Kids At The Zoo: Compilation1",
		imgUrl: "https://i.ytimg.com/vi/iVIjckwltkk/mqdefault.jpg",
		isDone: false,
		currentTime: 0,
	},
	{
		id: "mVjYG9TSN88",
		title: "Welcome to Angular’s renaissance — angular.dev",
		imgUrl: "https://i.ytimg.com/vi/mVjYG9TSN88/maxresdefault.jpg",
		isDone: false,
		currentTime: 0,
	},
];