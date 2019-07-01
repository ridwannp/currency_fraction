angular
.module('fractionCurrency',[])
.controller('currencyController', function ($scope) {
	// body...
	 $scope.actionSubmit = function(d){
        $scope.index = []
        //List fractions
        var fractions = [100000,50000,20000,10000,5000,1000,500,100,50]
        //Regex valid input
        var validRegex = /^(Rp)?( )?((\d{1,3}){1}((\.\d{3})+(\,00)?)|\d+)$/ //regex
        //Regex Currency
        var regexNum = /[Rp\. ]+/g

        if(d == null || d == "" || d.match(validRegex) == null){
           //Error
           var errorMsg = angular.element(document.querySelector('#input'))
           var errorFract = angular.element(document.querySelector('#fraction'))
           errorMsg.addClass('error-input')
           errorFract.addClass('error-input')
           $scope.errorNotification = true
        }else{
            //Success
            var errorMsg = angular.element(document.querySelector('#input'))
            var errorFract = angular.element(document.querySelector('#fraction'))
            errorMsg.removeClass('error-input')
            errorFract.removeClass('error-input')
            $scope.errorNotification = false
            //Remove currency chars
            $scope.format = parseInt(d.replace(regexNum,""))
            for(var i = 0; i < fractions.length; i++){
                if($scope.format % fractions[i] < $scope.format){
                    //Count fraction
                    $scope.result = Math.floor($scope.format / fractions[i])
                    $scope.format = $scope.format % fractions[i]
                    //Fraction
                    $scope.currentFractions = ($scope.result+" "+"x"+" "+"Rp"+" "+fractions[i])
                    //Get friction number
                    $scope.index.push($scope.currentFractions)
                }
            }
            //Format rest currency
            $scope.format = "Rp"+" "+$scope.format
        }
    }
    $scope.format = ""
})
