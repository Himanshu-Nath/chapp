angular.module('chapp')
  .controller('homeController', ['$state', '$scope', '$rootScope', 'homeService', 'toastAlert', 'appConfig', 'localStorageService', 'SocketService', '$compile', '$scope',
  function ($state, $scope, $rootScope, homeService, toastAlert, appConfig, localStorageService, SocketService, $compile, $scope) {
    var vm = this;
    var toast = toastAlert;
    let sendButtonFocus = false;
    var TYPING_TIMER_LENGTH = 4000; // ms

    var userInfo = localStorageService.get("USER_PROFILE");
    let male = userInfo.gender == 'Male';

    // const { senderId, text } = message
    
    
    function loadChat() {
      // const messageList = document.getElementById("messageList");
      // console.log(messageList);
      //   const messageUser = document.createElement('dt');
      //   const messageBody = document.createElement('dd');
    
      //   messageUser.appendChild(document.createTextNode("amit"));
      //   messageBody.appendChild(document.createTextNode("Hello"));
      //   messageList.appendChild(messageUser);
      //   messageList.appendChild(messageBody);

      // const messageList = document.getElementById("cardBody");
      // console.log(messageList);
      //   const messageUser = angular.element('<h5 class="card-title"/>');
      //   const messageBody = angular.element('<p class="card-text"/>');
    
      //   messageUser.append(document.createTextNode("Special title treatment"));
      //   messageBody.append(document.createTextNode("With supporting text below as a natural lead-in to additional content"));
      //   messageList.appendChild(messageUser);
      //   messageList.appendChild(messageBody);

      let name = "Amit";
      let msg = "Hi all users";
      angular.element(document).find('#cardBody').append($compile("<h5 class='card-title'>"+ name +"</h5>")($scope));
      angular.element(document).find('#cardBody').append($compile("<p class='card-text'>"+ msg +"</p>")($scope));
      angular.element(document).find('#cardBody').append($compile("<hr>")($scope));

      angular.element(document).find('#cardBody').append($compile("<h5 class='card-title'>"+ name +"</h5>")($scope));
      angular.element(document).find('#cardBody').append($compile("<p class='card-text'>"+ msg +"</p>")($scope));
      angular.element(document).find('#cardBody').append($compile("<hr>")($scope));

      angular.element(document).find('#cardBody').append($compile("<h5 class='card-title'>"+ name +"</h5>")($scope));
      angular.element(document).find('#cardBody').append($compile("<p class='card-text'>"+ msg +"</p>")($scope));
      angular.element(document).find('#cardBody').append($compile("<hr>")($scope));

    }    
    
    vm.sendMessage = function() {
      sendMessage();
      SocketService.emit('stop typing');
      //loadChat();
      // var ul = document.getElementById("dynamic-list");
      // var li = document.createElement("li");
      // li.setAttribute('id', 'amit');
      // li.appendChild(document.createTextNode('amit'));
      // ul.appendChild(li);
    }

    vm.joinGroupChat = function() {
      vm.sendButtonFocus = true;
      SocketService.emit('add user', userInfo.email);
    }

    vm.leaveGroupChat = function() {
      
    }
    
    // Sends a chat message
    const sendMessage = () => {
      var message = vm.message;
      vm.message = '';
      addMyChatMessage({
          username: userInfo.email,
          message: message
        });
        var sendData = {
          username: userInfo.email,
          message: message,
          gender: userInfo.gender
        };
        // tell server to execute 'new message' and send along one parameter
        SocketService.emit('new message', sendData);
    }

    // function addMyChatMessage(data) {
    //   angular.element(document).find('#cardBody').append($compile("<div style='text-align: left;'><h5 class='card-title'>"+ data.username +"</h5>")($scope));
    //   angular.element(document).find('#cardBody').append($compile("<p class='card-text'>"+data.message +"</p></div>")($scope));
    //   angular.element(document).find('#cardBody').append($compile("<hr>")($scope));
    // }

    function addMyChatMessage(data) {
      angular.element(document).find('#cardBody').append($compile("<div style='text-align: left;'><div class='row'><div class='col-sm-2'><img ng-if='"+male+"' src='assets/images/gender/boy.jpg' class='rounded-circle' alt='' width='70px'><img ng-if='!"+male+"' src='assets/images/gender/girl.jpg' class='rounded-circle' alt='' width='70px'></div><div class='col-sm-10'><h5 class='card-title'>"+ data.username +"</h5><p class='card-text'>"+data.message +"</p></div></div>")($scope));
      angular.element(document).find('#cardBody').append($compile("<hr>")($scope));
    }

    function addOtherChatMessage(data) {
      let male = data.gender == 'Male';
      angular.element(document).find('#cardBody').append($compile("<div style='text-align: right;'><div class='row'><div class='col-sm-10'><h5 class='card-title'>"+ data.username +"</h5><p class='card-text'>"+data.message +"</p></div><div class='col-sm-2'><img ng-if='"+male+"' src='assets/images/gender/boy.jpg' class='rounded-circle' alt='' width='70px'><img ng-if='!"+male+"' src='assets/images/gender/girl.jpg' class='rounded-circle' alt='' width='70px'></div></div></div>")($scope));
      angular.element(document).find('#cardBody').append($compile("<hr>")($scope));
    }

    // Log a message
    const log = (message, options) => {
      var $el = $('<li>').addClass('log').text(message);
      addMessageElement($el, options);
    }

    const addParticipantsMessage = (data) => {
      var message = '';
      if (data.numUsers === 1) {
        message += "there's 1 participant";
      } else {
        message += "there are " + data.usersCount + " participants";
      }
      angular.element(document).find('#cardBody').append($compile("<p class='card-text' style='text-align: center;'><i>"+ message +"</i></p></div>")($scope));
    }

    // Adds the visual chat typing message
    const addChatTyping = (data) => {
      data.typing = true;
      data.message = 'is typing';
      addChatMessage(data);
    }

    // Whenever the server emits 'new message', update the chat body
    SocketService.on('new message', (data) => {
      addOtherChatMessage(data);
    });

    // Whenever the server emits 'user joined', log it in the chat body
    SocketService.on('user joined', (data) => {
      angular.element(document).find('#cardBody').append($compile("<p class='card-text' style='text-align: center;'>"+data.username + "' joined'</p></div>")($scope));
      addParticipantsMessage(data);
    });

    // Whenever the server emits 'user left', log it in the chat body
    SocketService.on('user left', (data) => {
      angular.element(document).find('#cardBody').append($compile("<p class='card-text' style='text-align: center;'>"+data.username + "' left'</p></div>")($scope));
      addParticipantsMessage(data);
    });

    // Whenever the server emits 'typing', show the typing message
    SocketService.on('typing', (data) => {
      addChatTyping(data);
    });

    // Whenever the server emits 'stop typing', kill the typing message
    SocketService.on('stop typing', (data) => {
      removeChatTyping(data);
    });

    vm.whenTyping = function (event) {
      SocketService.emit('typing');
      lastTypingTime = (new Date()).getTime();
      setTimeout(() => {
        var typingTimer = (new Date()).getTime();
        var timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
          socket.emit('stop typing');
        }
      }, TYPING_TIMER_LENGTH);
    } 
 
    vm.whenNotTyping = function (event) {

    } 

  }]);