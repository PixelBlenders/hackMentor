

Template.header.helpers({
    'updateLocation': function() {
        
      if(!(Locations.findOne({createdBy: Meteor.userId()})))
        {
            latlng = Geolocation.latLng();
            if(latlng){
            Locations.insert({
                lat: Geolocation.latLng().lat,
                lng: Geolocation.latLng().lng,
                createdBy: Meteor.userId(),
                createdDate: new Date()
            });
            }
        }
    },
    'addMeta': function() {
        if(!(Meta.findOne({_id: Meteor.userId()})))
        {
            Meta.insert({
  _id: Meteor.userId(),
  points: 0,
  ques: 0,
  ans: 0
});
    }
    },
    
    'distance':function(x,y) { // pass lat2 and lon2 as params and then change console.log to return the dist value
        
        lat1=Locations.findOne({createdBy: Meteor.userId()}).lat;
        lon1=Locations.findOne({createdBy: Meteor.userId()}).lng;
        lat2=11;
        lon2=9;
        unit="K";
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var radlon1 = Math.PI * lon1/180
	var radlon2 = Math.PI * lon2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	console.log( dist);
}                                                                           
});