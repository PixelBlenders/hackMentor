Comments = new Mongo.Collection('comments');
Locations = new Mongo.Collection('locations');
Meta = new Mongo.Collection('meta');
Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(this.userId, String);
    check(commentAttributes, {
      postId: String,
      body: String
    });
    
    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);
      

    if (!post)
      throw new Meteor.Error('invalid-comment', 'You must answer a question');
    //number of answers
      var newans = Meta.findOne({_id:this.userId}).ans;
      newans +=1;
      Meta.update({_id:this.userId}, {$set: {ans: newans} } );
    
    comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    
    // update the post with the number of comments
    Posts.update(comment.postId, {$inc: {commentsCount: 1}});
    
    // create the comment, save the id
    comment._id = Comments.insert(comment);
    
    // now create a notification, informing the user that there's been a comment
    createCommentNotification(comment);
    
    return comment._id;
  }
});
