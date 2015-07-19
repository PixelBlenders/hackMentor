x=null;
i=null;
Router.route('/profile/:_id',{
    //name:'profile/Meteor.user()._id',
    
    template:'profile',
    data:function(){
       i=this.params._id;
       x=Meteor.users.findOne({_id:i}).username;
    }
    
});
Template.profile.helpers({
    'name':function(){
        return x;
    },
    'points':function(){
        
        return Meta.findOne({_id:i}).points;
    },
    'ques':function(){
        return Meta.findOne({_id:i}).ques;
    },
    'ans':function(){
        return Meta.findOne({_id:i}).ans;
    },
    'lat':function(){
        return Locations.findOne({createdBy:i}).lat;
    },
    'lng':function(){
        return Locations.findOne({createdBy:i}).lng;
    },
    'dist':function(){
        
        
//        var x=distance(Locations.findOne({createdBy:pId}).lat,Locations.findOne({createdBy:pId}).lng);
        
        lat1=Locations.findOne({createdBy: Meteor.userId()}).lat;
        lon1=Locations.findOne({createdBy: Meteor.userId()}).lng;
        lat2=Locations.findOne({createdBy:i}).lat;
        lon2=Locations.findOne({createdBy:i}).lng;
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
//	console.log( dist);
        return Math.round(dist * 100) / 100;
    }
});