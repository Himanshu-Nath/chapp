angular.module("chapp")
.directive("scrollBottom", function(){
    return {
        link: function(scope, element, attr){
            var $id= $("#" + attr.scrollBottom);
            $(element).on("blur", function(){
                $id.scrollTop($id[0].scrollHeight);
            });
        }
    }
});