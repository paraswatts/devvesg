import React, { useState } from "react";

import { Autocomplete, GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Input, Modal, Skeleton } from "antd";

const apiKey = process.env.GOOGLE_MAPS_KEY || 'AIzaSyBpJuU5dd6BEAn5F38H4ZkEM3oJUYL42e8';
export const GMapContent = React.memo(({ captureLocation, modalVisiblity }: { captureLocation: (visible: boolean, coordinates?: google.maps.LatLngLiteral) => void, modalVisiblity: boolean }) => {

    const [markerPosition, setMarkerPosition] = React.useState<google.maps.LatLngLiteral>({ lat: 27.994402, lng: -81.760254 });
    const [place, setPlace] = useState('');
    const containerStyle = {
        width: '100%',
        height: '300px'
    };


    const { isLoaded } = useLoadScript({
        googleMapsApiKey: apiKey || '',
        libraries: ['places']
    });

    const loadLocation = (e: any) => {

        const geocoder: google.maps.Geocoder = new google.maps.Geocoder();
        const address = e.target.value;
        geocoder.geocode({ address }, (results, status) => {
            if (status === 'OK' && results !== null) {
                const ltude = results[0].geometry.location;
                setPlace(address);
                setMarkerPosition((state) => {
                    return { lat: ltude.lat(), lng: ltude.lng() };
                });
            }
        });
    }

    const positioned = (location: any) => {
        setMarkerPosition((state) => {
            return { lat: location.latLng?.lat(), lng: location.latLng?.lng() };
        });
    }

    const ok = (e: any) => {
        captureLocation(true, markerPosition);
    }

    const cancel = (e: any) => {
        captureLocation(false);
    }

    if (!isLoaded) {
        return <Skeleton />;
    }

    return (
        <div hidden={modalVisiblity}>
            <Modal
                title="Location"
                centered
                visible={modalVisiblity}
                onOk={ok}
                onCancel={cancel}
                width={1000}
                bodyStyle={{ height: '325px' }}
            >
                <div className="mb-1">
                    {/* <form onSubmit={loadLocation}> */}
                    <Autocomplete>
                        <Input placeholder="Search Location" size="large" id='place' name='place' value={place} onPressEnter={loadLocation} onChange={(e: any) => setPlace(e.target.value)} />
                    </Autocomplete>
                    {/* </form> */}
                </div>
                <div>
                    <GoogleMap
                        center={markerPosition}
                        zoom={15}
                        mapContainerStyle={containerStyle}
                        onClick={positioned}
                        options={{
                            zoomControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                            streetViewControl: false
                        }}
                    >
                        <Marker position={markerPosition}></Marker>
                    </GoogleMap>

                </div>
            </Modal>

        </div>);
});