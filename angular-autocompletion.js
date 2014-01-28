angular.module('autocompletion', []).directive('autocompletion', function($timeout){
    return{
        restrict: 'AC',
        scope:{
            ngModel: '=',
            onComplete: '&',
            wait: '=?',
            min: '=?'
        },
        require: 'ngModel',
        link: function(scope, element){
            scope.wait = scope.wait || 300; //wait default to 300ms
            scope.min = scope.min || 2; //at least 2 chars before calling oncomplete
            
            var timeout;
            scope.$watch('ngModel', function(newVal, oldVal){
                if(!newVal || (newVal.length < scope.min && oldVal.length < scope.min) || newVal == oldVal) return;
                
                $timeout.cancel(timeout);
                timeout = $timeout(function(){
                    scope.onComplete();
                }, scope.wait);
            });
        }
    };
});
