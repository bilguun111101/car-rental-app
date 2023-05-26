import { geocodeCenter } from '@/atoms/geocodeCenter';
import React from 'react';
import { useRecoilState } from 'recoil';
import ReactMapGL, { Marker } from 'react-map-gl';
import { MapPinIcon } from '@heroicons/react/24/solid';

type Props = {
  height: string;
  zoom: number;
  bounce: boolean;
  pinSize: number;
};

const Map = ({ height, zoom, bounce, pinSize }: Props) => {
  const [geoCenter, setGeoCenter] = useRecoilState(geocodeCenter); //[106.9177016, 47.9184676]
  const URL = process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL!;
  const token = process.env.NEXT_PUBLIC_MAPBOX_KEY_SEARCK_ACCESS_TOKEN!;

  return (
    <>
      <div className={height}>
        {geoCenter.length > 0 && (
          <ReactMapGL
            initialViewState={{
              longitude: geoCenter[0],
              latitude: geoCenter[1],
              zoom: zoom,
            }}
            style={{ width: '100%', height: '100%' }}
            //"https://studio.mapbox.com/styles/ganzorig2022" mapbox site-aas custom style-nii url-aa huulj tawina.
            mapStyle={URL}
            mapboxAccessToken={token}
          >
            <Marker
              longitude={geoCenter[0]}
              latitude={geoCenter[1]}
              anchor='top'
            >
              <MapPinIcon
                className={`h-${pinSize} text-red-primary ${
                  bounce && 'animate-bounce'
                }`}
              />
            </Marker>
          </ReactMapGL>
        )}
      </div>
    </>
  );
};

export default Map;
