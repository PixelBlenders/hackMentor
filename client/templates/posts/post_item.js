Template.postItem.helpers({
  ownPost: function() {
    return this.userId == Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-primary upvotable';
    } else {
      return 'disabled';
    }
  },
    dist:function(){
        var pId= Posts.findOne({_id:this._id}).userId;
        
//        var x=distance(Locations.findOne({createdBy:pId}).lat,Locations.findOne({createdBy:pId}).lng);
        
        lat1=Locations.findOne({createdBy: Meteor.userId()}).lat;
        lon1=Locations.findOne({createdBy: Meteor.userId()}).lng;
        lat2=Locations.findOne({createdBy:pId}).lat;
        lon2=Locations.findOne({createdBy:pId}).lng;
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
    },
    id:function(){
    return Posts.findOne({_id:this._id}).userId;
    }
});

Template.postItem.events({
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
});