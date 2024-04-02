import React, { useEffect, useState, useCallback } from "react";
import "./index.css";

const soundBank = {
	Q: {
		Title: "Heater 1",
		ID: "heater_1",
		Source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
	},
	W: {
		Title: "Heater 2",
		ID: "heater_2",
		Source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
	},
	E: {
		Title: "Heater 3",
		ID: "heater_3",
		Source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
	},
	A: {
		Title: "Heater 4",
		ID: "heater_4",
		Source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
	},
	S: {
		Title: "Heater 6",
		ID: "heater_6",
		Source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
	},
	D: {
		Title: "Open HH",
		ID: "open_hh",
		Source: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
	},
	Z: {
		Title: "Kick n Hat",
		ID: "kick_in_hat",
		Source: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
	},
	X: {
		Title: "Kick",
		ID: "kick",
		Source: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
	},
	C: {
		Title: "Closed HH",
		ID: "closed_hh",
		Source: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
	},
};

const DrumMachine = () => {
	const [power, setPower] = useState(1);
	const [volume, setVolume] = useState(0.5); // Initial volume set to 50%

	const handlePadClick = useCallback(
		async (padKey) => {
			if (power === 1) {
				const soundToPlay = document.getElementById(padKey);
				const soundTitle = soundBank[padKey]["Title"];
				document.getElementById("display").innerHTML = soundTitle;
				soundToPlay.volume = volume; // Set the volume before playing
				soundToPlay.play();
				soundToPlay.currentTime = 0; // Reset audio to start
			}
		},
		[power, volume]
	);

	useEffect(() => {
		const handleKeyPress = (event) => {
			const thisKey = event.key.toUpperCase();
			const regex = new RegExp("Q|W|E|A|S|D|Z|X|C");
			if (regex.test(thisKey)) {
				handlePadClick(thisKey);
			}
		};

		document.addEventListener("keydown", handleKeyPress);
		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, [handlePadClick]);

	const updatePower = (value) => {
		setPower(value);
	};

	const handleVolumeChange = (event) => {
		setVolume(parseFloat(event.target.value)); // Convert volume value to a float
	};

	return (
		<div
			id="drum-machine"
			className="container mx-auto p-5 bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center">
			<h1 className="text-4xl mb-8">Drum Machine</h1>
			<div className="flex items-center mb-4">
				<label
					htmlFor="powerToggle"
					className="flex items-center cursor-pointer">
					<div className="relative">
						<input
							type="checkbox"
							id="powerToggle"
							checked={power === 1}
							onChange={() => updatePower(power === 1 ? 0 : 1)}
							className="hidden"
						/>
						{/* Switch track */}
						<div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
						{/* Switch handle */}
						<div
							className={`${
								power === 1 ? "translate-x-full bg-white" : "bg-gray-200"
							} absolute left-0 top-0 w-6 h-6 rounded-full shadow transition-transform duration-300 ease-in-out`}
							style={{ marginTop: -4 }}></div>
					</div>
					{/* Label */}
					<div className="ml-3 text-sm text-white">
						{power === 1 ? "On" : "Off"}
					</div>
				</label>
			</div>

			<div
				id="display"
				className="px-6 py-3 rounded-lg bg-white text-slate-900 text-lg font-semibold shadow-m m-6">
				{power === 1 ? "Drum Machine" : "Power Off"}
			</div>

			{/* Volume Control */}
			<div className="flex items-center mb-4">
				<label htmlFor="volumeControl" className="text-white mr-4">
					Volume:
				</label>
				<input
					type="range"
					id="volumeControl"
					value={volume}
					min="0"
					max="1"
					step="0.01"
					onChange={handleVolumeChange}
					className="w-40 h-2 bg-gray-400 rounded-full appearance-none outline-none"
				/>
			</div>

			<div className="grid grid-cols-3 gap-4">
				{Object.keys(soundBank).map((key) => (
					<button
						key={key}
						className={`drum-pad bg-gray-700 p-8 text-center rounded-md hover:bg-gray-600 focus:bg-gray-600 transition-colors duration-300 ease-in-out relative ${
							power === 0 ? "cursor-not-allowed" : ""
						}`}
						disabled={power === 0}
						id={soundBank[key].ID} // Unique ID based on soundBank
						onClick={() => handlePadClick(key)}>
						{key}
						<audio
							className="clip absolute inset-0 opacity-0"
							id={key}
							src={soundBank[key].Source}
						/>
					</button>
				))}
			</div>
		</div>
	);
};

export default DrumMachine;
