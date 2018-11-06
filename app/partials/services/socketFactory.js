angular.module('chapp')
.service('SocketService', ['socketFactory', function (socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://'+location.host)
    });
}]);