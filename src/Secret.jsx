import React, { useEffect } from 'react';
import {
	Player,
	ControlBar,
	ReplayControl,
	ForwardControl,
	CurrentTimeDisplay,
	TimeDivider,
	VolumeMenuButton
} from 'video-react';
import 'video-react/dist/video-react.css'; // import css

const Secret = () => {
	useEffect(() => {}, []);
	return (
		<div>
			<div className="container">
				<div className="row">
					<div className="col-md-6 mt-5 mx-auto">
						<div style={{ textAlign: 'center' }}>
							<h1>Secret</h1>
							<p>Geheim!</p>
						</div>
						<Player poster="/assets/bunny.png">
							<source height="20px" src="http://media.w3.org/2010/05/bunny/movie.mp4" />
							<ControlBar>
								<ReplayControl seconds={10} order={1.1} />
								<ForwardControl seconds={10} order={1.2} />
								<CurrentTimeDisplay order={4.1} />
								<TimeDivider order={4.2} />
								<VolumeMenuButton disabled />
							</ControlBar>
						</Player>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Secret;
