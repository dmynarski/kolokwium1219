import React from 'react';
import SimpleImageSlider from "react-simple-image-slider";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


class HomePage extends React.Component {
  render() {
    const images = [
      { url: 'https://www.windwardfordhawaii.com/inventoryphotos/4843/3fa6p0su8kr252206/ip/1.jpg?height=400'},
      { url: 'https://photos.motorcar.com/used-2017-chevrolet-impala-4drsedanltw1lt-6111-19245108-1-640.jpg'},
      { url: 'https://www.windwardfordhawaii.com/inventoryphotos/4843/3fa6p0su8kr252206/ip/1.jpg?height=400'}
    ]
    console.log(images)
    return (
      <div>
        <Carousel showThumbs={false} width={860}>
         <div><img src="https://www.windwardfordhawaii.com/inventoryphotos/4843/3fa6p0su8kr252206/ip/1.jpg?height=400" />
         <p className="legend">Legend 2</p>
         </div>
         <div><img src="https://www.windwardfordhawaii.com/inventoryphotos/4843/3fa6p0su8kr252206/ip/1.jpg?height=400" />
         <p className="legend">Legend 3</p>
         </div>
         <div><img src="https://www.windwardfordhawaii.com/inventoryphotos/4843/3fa6p0su8kr252206/ip/1.jpg?height=400" />
         <p className="legend">Legend 4</p>
         </div>
        </Carousel>
      </div>
    );
  }
}

export default HomePage