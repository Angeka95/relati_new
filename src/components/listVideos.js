import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

export default function ListVideos({playlistId})  {

    const [videos, setVideos] = useState([]);
     const [selectedVideo, setSelectedVideo] = useState(null);

     useEffect(() => {
        const fetchVideos = async () => {
          const apiKey = 'AIzaSyC_xqHvuHWVK4ZDj0r1J1zM4hnEKsFIhAo';
        //   const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=10&key=${apiKey}`;
       
         const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLbtegW3d3L4IAUQrIcYb8-ADAD1FDPmLc&maxResults=10&key=${apiKey}`;
   

          
          
          const response = await axios.get(url);
          setVideos(response.data.items);
          setSelectedVideo(response.data.items[0]); // Seleccionar el primer video por defecto
        };
    
        fetchVideos();
      }, [playlistId]);
    
      const handleVideoSelect = (video) => {
        setSelectedVideo(video);
      };


return (    
<div className="margin_bottom_l"> 
 <div className="flex width_100 list_video_container  scroll-container padding_none">
      {selectedVideo && (
        <div className="wrap video_container">
            <div className="video_image"> 
                <iframe className=" video_frame"
                    src={`https://www.youtube.com/embed/${selectedVideo.snippet.resourceId.videoId}`}
                    title={selectedVideo.snippet.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
          </div>
            <div className="video_data "> 
                <h4 className="text_bolder margin_bottom_m">{selectedVideo.snippet.title}</h4>
                <div className="item_ellipsis"> 
                <p>{selectedVideo.snippet.description}</p>
                </div> 
            </div>
        </div>
      )}
      <div className="list_video margin_left_m">

        <div>
          {videos.map((video) => (
            <p className="list_video_item" key={video.id} onClick={() => handleVideoSelect(video)} style={{ cursor: 'pointer' }}>
              {video.snippet.title}
            </p>
          ))}
        </div>
      </div>
    </div>
</div>
          
);
}