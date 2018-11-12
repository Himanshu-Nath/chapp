const randomize = require('randomatic');
const consts = require('../util/constant');
const utils = require('../util/utils');
const keys = require('../util/keys');

require('../models/users');
var User = mongoose.model('userCollection');

const logger = container.get('logger');

module.exports = {    
    // http://55.55.53.143:4000/api/user/find?email=&page=1&limit=10 (GET)
    findUsers: function(req, res) {
        let userFindDetail = req.query;
        let searchQuery = {};
        if(userFindDetail.name) {
            searchQuery.name = new RegExp(userFindDetail.name, 'i');
        }
        if(userFindDetail.email) {
            searchQuery.email = new RegExp(userFindDetail.email, 'i');
        }
        if(userFindDetail.mobile) {
            searchQuery.mobile = new RegExp(Number(userFindDetail.mobile), 'i');
        }
        User.paginate(searchQuery, { select:   '_id name email mobile gender status last_login', sort: { name: 1 },page: Number(userFindDetail.page), limit: Number(userFindDetail.limit) })
        .then(function(result) {
            if(result.docs.length > 0)
                res.status(200).send({status: true, message: consts.SUCCESS, devMessage: "Reocrd found", result});
            else
                res.status(200).send({status: false, message: consts.FAIL, devMessage: "No Reocrd found"});
        })
        .catch(function(error) {
            logger.error("findUsers: Error due to: "+err);
            res.status(500).send({status: false, message: consts.FAIL, devMessage: "Error while finding user", error});
        });
    },

    // http://55.55.53.143:4000/api/user/5bd044e54ce1023e20a25e03 (GET)
    finduserById: function(req, res) {
        User.findById(req.params.userId, {name:1, email:1, mobile:1, gender:1, status:1, last_login:1, friends:1})
        .then(function(result) {
            if(result != null)
                res.status(200).send({status: true, message: consts.SUCCESS, devMessage: "User found", result});
            else
                res.status(200).send({status: false, message: consts.FAIL, devMessage: "User not found"});
        })
        .catch(function(err) {
            logger.error("finduserById: Error due to: "+err);
            res.status(403).send({status: false, message: consts.FAIL, devMessage: "Error while finding user by id", err});
        });
    },

    // http://55.55.53.143:4000/api/user/friendrequest(POST)
    // {
    //     "toUser": "5bd044e54ce1023e20a25e03",
    //     "fromUser": "5bdff246fa507433a0a874ea"
    // }
    addFriendRequest: function(req, res) {
        let friendRequestDetail = req.body;
        User.findOneAndUpdate({_id: friendRequestDetail.toUser}, {$push: {follower: {id: friendRequestDetail.fromUser, status: false }}})
        .then(function(result) {
            if(result != null)
                return {status: true};
            else
                return {status: false};
        })
        .then(function(response) {
            if(response.status) {
                User.findOneAndUpdate({_id: friendRequestDetail.fromUser}, {$push: {follow: {id: friendRequestDetail.toUser, status: true }}})
                .then(function(result) {
                    if(result != null)
                    res.status(200).send({status: true, message: consts.SUCCESS, devMessage: "Friend request send"});
                else
                    res.status(200).send({status: false, message: consts.FAIL, devMessage: "Friend request failed to send"});
                });
            }
        })
        .catch(function(err) {
            logger.error("addFriendRequest: Error due to: "+err);
            res.status(403).send({status: false, message: consts.FAIL, devMessage: "Error while sending friend request", err});
        });
    },

    //http://55.55.53.143:4000/api/user/followandfollower?follow=true&userId=5bdff246fa507433a0a874ea&page=1&limit=10 (GET)
    getUserFollowAndFollowerList: function(req, res) {
        let userFindDetail = req.query;
        console.log(userFindDetail);
        let projectionView = {
            page: Number(userFindDetail.page), 
            limit: Number(userFindDetail.limit)
        };
        if(JSON.parse(userFindDetail.follow)) {
            projectionView.select = '_id name follow';
            projectionView.sort = {"follow.status": 1}
        } else {
            projectionView.select = '_id name follower';
            projectionView.sort = {"follower.status": 1}
        }
        User.paginate({_id: userFindDetail.userId}, projectionView)
        .then(function(result) {
            if(result != null)
                res.status(200).send({status: true, message: consts.SUCCESS, devMessage: "Follwer/Follow found", result});
            else
                res.status(200).send({status: false, message: consts.FAIL, devMessage: "No follwer/follow found"});
        })
        .catch(function(error) {
            logger.error("getUserFollowAndFollowerList: Error due to: "+err);
            res.status(500).send({status: false, message: consts.FAIL, devMessage: "Error while finding user follwer/follow", error});
        });
    },

    // http://55.55.53.143:4000/api/user/acceptandreject (PUT)
    // {
    //     "userId": "5bdff246fa507433a0a874ea",
    //     "requesedUserId": "5bd044e54ce1023e20a25e03",
    //     "accept": false
    // }
    acceptAndRejectRequest: function(req, res) {
        let acceptAndRejectDetail = req.body;
        let query;
        let update;
        let status;
        console.log(acceptAndRejectDetail);
        if(acceptAndRejectDetail.accept) {
            status = "Accepted";
            query = {_id: acceptAndRejectDetail.userId, "follower.id": acceptAndRejectDetail.requesedUserId};
            update = {$set: {"follower.$.status": true }};
        } else {
            status = "Rejected";
            query = {_id: acceptAndRejectDetail.userId};
            update = {$pull: {follower: {id: acceptAndRejectDetail.requesedUserId}}};

            User.findOneAndUpdate({_id: acceptAndRejectDetail.requesedUserId}, {$pull: {follow: {id: acceptAndRejectDetail.userId}}})
            .then(function(result) {
                if(result != null)
                    logger.info("acceptAndRejectRequest: User request removed from follow");
                else
                    res.status(200).send({status: false, message: consts.FAIL, devMessage: "Failed to remove request from follow"});
            })
            .catch(function(error) {
                logger.error("acceptAndRejectRequest: Error due to: "+error);
                res.status(500).send({status: false, message: consts.FAIL, devMessage: "Error while remove request from follow", error});
            });
        }
        User.findOneAndUpdate(query, update)
        .then(function(result) {
            if(result != null)
                res.status(200).send({status: true, message: consts.SUCCESS, devMessage: "Friend request "+status});
            else
                res.status(200).send({status: false, message: consts.FAIL, devMessage: "Friend request failed to "+status});            
        })
        .catch(function(error) {
            logger.error("acceptAndRejectRequest: Error due to: "+error);
            res.status(500).send({status: false, message: consts.FAIL, devMessage: "Error while accepting/rejecting friend request", error});
        });
    },

    // http://55.55.53.143:4000/api/user/friendlist/5bdff246fa507433a0a874ea (GET)
    getUserFriendList: function(req, res) {
        let userDetail = req.params;
        User.findOne({_id: userDetail.userId, "follower.status": true}, {_id: 0, "follower.id":1})
        .then(function(result) {
            if(result != null) {
                ids = [];
                for(let id of result.follower) {
                    ids.push(mongoose.Types.ObjectId(id.id));
                }
                return {friends: ids};
            } else
                return {friends: null};
        })
        .then(function(response) {
            if(response.friends != null) {
                User.find({_id: {$in: response.friends}}, {name:1, email:1, gander:1, mobile:1})
                .then(function(result) {
                    if(result != null)
                    res.status(200).send({status: true, message: consts.SUCCESS, devMessage: "Successfully fetched friend list", result});
                else
                    res.status(200).send({status: false, message: consts.FAIL, devMessage: "Failed to fetch friend list"});
                });
            } else {
                res.status(200).send({status: false, message: consts.FAIL, devMessage: "No friends found"});
            }
        })
        .catch(function(err) {
            logger.error("getUserFriendList: Error due to: "+err);
            res.status(403).send({status: false, message: consts.FAIL, devMessage: "Error while sending friend request", err});
        });
    },

    getUserOnlineFriends: function(req, res) {
        let userDetail = req.params;
        User.findOne({_id: userDetail.userId, "follower.status": true}, {_id: 0, "follower.id":1})
        .then(function(result) {
            if(result != null) {
                ids = [];
                for(let id of result.follower) {
                    ids.push(mongoose.Types.ObjectId(id.id));
                }
                return {friends: ids};
            } else
                return {friends: null};
        })
        .then(function(response) {
            if(response.friends != null) {
                User.find({_id: {$in: response.friends}, currently_active: true}, {name:1, email:1, gander:1, mobile:1})
                .then(function(result) {
                    if(result != null)
                    res.status(200).send({status: true, message: consts.SUCCESS, devMessage: "Successfully fetched online friend list", result});
                else
                    res.status(200).send({status: false, message: consts.FAIL, devMessage: "Failed to fetch online friend list"});
                });
            } else {
                res.status(200).send({status: false, message: consts.FAIL, devMessage: "No online friends found"});
            }
        })
        .catch(function(err) {
            logger.error("getUserOnlineFriends: Error due to: "+err);
            res.status(403).send({status: false, message: consts.FAIL, devMessage: "Error while sending friend request", err});
        });
    },

}