
Template.header.helpers({
  activeRouteClass: function(/* route names */) {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    
    var active = _.any(args, function(name) {
      return Router.current() //&& Router.current().route.getName() === name 
    });
    
    return active && 'active';
  },
    'id':function(){
        return Meteor.user()._id;
    }
});
Template.header.events({
'click #sos':function(){
    
    var x=document.getElementById('nav');
    x.className +=" sos";
    
},
    'click #ask':function(){
        console.log(x);
        
        var x=document.getElementById('nav');
        if(x.className=="navbar sos")
        {
            x.className="navbar";
        }
            
        
    },
    'click #pro':function(){
        console.log(x);
        
        var x=document.getElementById('nav');
        if(x.className=="navbar sos")
        {
            x.className="navbar";
        }
            
        
    },
    
    'click #hme':function(){
        console.log(x);
        
        var x=document.getElementById('nav');
        if(x.className=="navbar sos")
        {
            x.className="navbar";
        }
            
        
    }
});