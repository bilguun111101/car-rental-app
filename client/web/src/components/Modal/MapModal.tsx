import 'mapbox-gl/dist/mapbox-gl.css'; // this is important for Marker's strange behaviour
import Map from '../Reserve/cars/Map';

type Props = {
  height: string;
  zoom: number;
  bounce: boolean;
  pinSize: number;
};

const MapModal = ({ height, zoom, bounce, pinSize }: Props) => {
  return (
    <>
      <input type='checkbox' id='map' className='modal-toggle' />
      <div className='modal modal-middle'>
        <div className='modal-box max-h-screen !scrollbar-thin !scrollbar-track-transparent !scrollbar-thumb-transparent'>
          <label
            htmlFor='map'
            className='btn-sm btn-circle btn absolute right-2 top-2 z-10'
          >
            ✕
          </label>
          <div>
            <Map
              height={height}
              zoom={zoom}
              bounce={bounce}
              pinSize={pinSize}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MapModal;
