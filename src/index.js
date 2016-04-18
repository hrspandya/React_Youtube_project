import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import YTSearch from 'youtube-api-search';
const API_KEY = 'AIzaSyDRM2bJ2CvRTc0P-mb-JT6x3-WyFxVGFmw';


class App extends React.Component {
	constructor(props) {
		super(props);

		//Saving Videos in States
		// Every data points which changes over time needs to be handled by States
		this.state = {
			videos : [],
			selectedVideo : null
		};

		this.videoSearch("surfboards");
	}

	videoSearch(term){
		var that = this;
		YTSearch({ key : API_KEY, term : term}, function(videos){
			that.setState({
				videos : videos,
				selectedVideo : videos[0]
			});
			console.log(that.state.videos);
		});
	}

	render(){

		const videoSearch = _.debounce(function(term){
			this.videoSearch(term);
		}, 500);

		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch.bind(this)} />
				<VideoDetail video={this.state.selectedVideo}/>
				<VideoList
					onVideoSelect={this.setSelectedVideo.bind(this)}
					videos={this.state.videos} />
			</div>
		);
	}

	//Set Selected Video State
	setSelectedVideo(selectedVideo){
			this.setState({ selectedVideo : selectedVideo });
	}

}


//Put Component into the DOM
ReactDOM.render(<App />, document.querySelector('.container'));
