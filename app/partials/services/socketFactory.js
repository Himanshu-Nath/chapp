angular.module('chapp')
.service('SocketService', ['socketFactory', function (socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:4000')
    });
}]);