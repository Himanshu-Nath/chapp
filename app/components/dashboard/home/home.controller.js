angular.module('chapp')
  .controller('homeController', ['$state', '$rootScope', 'homeService', 'toastAlert', 'appConfig', 'localStorageService', 'SocketService', '$compile', '$scope',
  function ($state, $rootScope, homeService, toastAlert, appConfig, localStorageService, SocketService, $compile, $scope) {
    var vm = this;
    var toast = toastAlert;

    var userInfo = localStorageService.get("USER_PROFILE");

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
          message: message
        };
        // tell server to execute 'new message' and send along one parameter
        SocketService.emit('new message', sendData);
    }

    vm.joinGroupChat = function() {
      SocketService.emit('add user', userInfo.email);
    }

    vm.leaveGroupChat = function() {
      
    }

    // function addMyChatMessage(data) {
    //   angular.element(document).find('#cardBody').append($compile("<div style='text-align: left;'><h5 class='card-title'>"+ data.username +"</h5>")($scope));
    //   angular.element(document).find('#cardBody').append($compile("<p class='card-text'>"+data.message +"</p></div>")($scope));
    //   angular.element(document).find('#cardBody').append($compile("<hr>")($scope));
    // }

    function addMyChatMessage(data) {
      angular.element(document).find('#cardBody').append($compile("<div style='text-align: left;'><h5 class='card-title'>"+ data.username +"</h5><p class='card-text'>"+data.message +"</p></div>")($scope));
      // angular.element(document).find('#cardBody').append($compile("<p class='card-text'>"+data.message +"</p></div>")($scope));
      angular.element(document).find('#cardBody').append($compile("<hr>")($scope));
    }

    function addOtherChatMessage(data) {
      angular.element(document).find('#cardBody').append($compile("<div style='text-align: right;'><h5 class='card-title'>"+ data.username +"</h5><p class='card-text'>"+data.message +"</p></div>")($scope));
      // angular.element(document).find('#cardBody').append($compile("<p class='card-text'>"+data.message +"</p></div>")($scope));
      angular.element(document).find('#cardBody').append($compile("<hr>")($scope));
    }

    SocketService.on('new message', (data) => {
      console.log("---------1");
      console.log(data);
      addOtherChatMessage(data);
    });

  }]);