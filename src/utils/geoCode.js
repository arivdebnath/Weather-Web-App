const request = require('request');

const geoCode = (address, callback) => {
    if (address) {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXJpdmRlYm5hdGgiLCJhIjoiY2t3ejRtMmtmMDM2MTJvcWx1djNnbjl0cyJ9.SfxFYPK0npYNRB6yDs3lxA&limit=1';

        request({ url , json: true }, (error, {body}) => {
            if (error) {
                callback('Unable to connect to location services', undefined);
            }
            else if (body.features.length === 0) {
                callback('Unable to get location, try another search', undefined);
            }
            else {
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    placeName: body.features[0].place_name,
                });
            }
        })
    }
    else{
        callback('Please provide a location!', undefined);
    }


}

module.exports = geoCode;

// geoCode('central honshu, japan', (error,response)=>{
//     if(error){
//         console.log(error);
//     }
//     else{
//         console.log('Latitude: ' + latitude);
//         console.log('Longitude: ' + longitude);
//         console.log('Place Name: ' + placeName);
//     }
// })