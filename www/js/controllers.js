angular.module('starter.controllers', [])

.controller('LogCtrl', ['$scope','$state',function($scope,$state) {

    //window.localStorage.clear();
    
    $scope.mileageDB = extractJSONFromLocalStorage();
    $scope.mileageDB.reverse();
    
    $scope.addEntry = function () {
        
        $scope.mileageDB.reverse();
        console.log('logging entry');
        console.log($scope.mileageDB.length);
        var mileage=calcMileage(this.newKm,this.newLiters);
        $scope.mileageDB.push({date: calcDate(),km: this.newKm, liter: this.newLiters, mileage: mileage});

        jsonToLocalStorage($scope.mileageDB);
        $scope.newKm = '';
        $scope.newLiter = '';
        $scope.mileageDB.reverse();
        $state.go('tab.DB');
    };
    

  function calcMileage(currKm,currLiter){
    
      if($scope.mileageDB.length==1)
      {
          return (parseFloat(currKm) - parseFloat($scope.mileageDB[0].km)) / parseFloat(currLiter);}
      else{
          return (parseFloat(currKm) - parseFloat($scope.mileageDB[$scope.mileageDB.length-1].km)) / parseFloat(currLiter);
          
            }
      }
    
  function calcDate(){
    var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        } 

        if(mm<10) {
            mm='0'+mm
        } 

        today = dd+'/'+mm+'/'+yyyy;
        return today;
  }
    
    
    
    function extractJSONFromLocalStorage() {
        return JSON.parse(localStorage.getItem("mileageDB")) || 
           [{date: calcDate(), km: '0',liter:'0', mileage: ''}] 
}
    
    function jsonToLocalStorage(mileageDb) {
        var jsonTodo = angular.toJson(mileageDb);

        if (jsonTodo != 'null') {
            localStorage.setItem("mileageDB", jsonTodo);
        } else {
            alert("Invalid JSON!");
        }
    }

}]);


