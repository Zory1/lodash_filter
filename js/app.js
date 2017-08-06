(function(){

    var app = angular.module('lodash', []);
    var _f = collection_functions_module();
   
    app.controller("lodash_controller", [ '$scope', function($scope){
        
        $scope.fun={};
        $scope.fun.function_name = "";

        $scope.process_input = function (){
            try{
                if($scope.params.$invalid){
                    $scope.message = true;
                    document.getElementById("err-msg").className = document.getElementById("err-msg").className.replace(/\bhide\b/,'show');
                    return;
                }
                present_results();
                makeChart();
            }catch(e){
                console.log("Could not process input fully.");
                console.log(e);
            }
        }
        
        $scope.clear_input = function(){
            $scope.message = false;
            $scope.fun = {};
            $scope.fun.collection = "";
            document.getElementById("lb").classList.remove("active");
             
            $scope.params.$setUntouched();
            $scope.params.$setPristine();

            $scope.results = false;
            $scope.results_error = false;
        }

        var present_results = function(){
         try{
            $scope.results = {};
            var collection = format_collection($scope.params.collection.$viewValue);
            var predicate = format_predicate($scope.params.predicate_type.$viewValue, $scope.params.predicate.$viewValue);
            var fun_name = $scope.params.function.$viewValue; 
            
            $scope.function_name = fun_name;
            $scope.results.elements = run_function(fun_name, collection, predicate);
            $scope.results.collection_count = get_size_of(collection);
            
            switch(fun_name){
                case 'filter':
                case 'reject':
                case 'some':
                case 'every':
                if(fun_name === "some" || fun_name === "every"){
                    $scope.results.true_elements = collection.filter(predicate);
                    var res = $scope.results.true_elements;
                    $scope.results.false_elements = collection.filter(function(e){ if(res.indexOf(e) === -1)return e });
               
                }else{
                    var res =  $scope.results.elements;
                    $scope.results.false_elements = collection.filter(function(e){ if(res.indexOf(e) === -1)return e });
                    $scope.results.true_elements = collection.filter(function(e){ if(res.indexOf(e) != -1)return e });
               
                }
                
                 break;

                case 'partition':
                if(typeof $scope.results.elements !="undefined" && typeof $scope.results.elements[0] === 'object' && typeof $scope.results.elements[1] === 'object'){
                    $scope.results.true_elements = $scope.results.elements[0];
                    $scope.results.false_elements = $scope.results.elements[1];
                }
                break;

            }

            if(typeof $scope.results.true_elements != "undefined" && typeof $scope.results.false_elements != "undefined"){
                 $scope.results.true_count = get_size_of($scope.results.true_elements);
                 $scope.results.false_count = get_size_of($scope.results.false_elements);
                
                 if($scope.results.false_count === 0 &&  $scope.results.true_count === 0)throw "Error sizes of false and true counters were 0";
            } else {
                throw "Error - no true or falsy elements defined.";
            }
            $scope.results.available = true;
            console.log("Here come the results, for debugging purposes.");
            console.log($scope.function_name)
            console.log($scope.results.elements)
            console.log($scope.results.true_elements);
            console.log($scope.results.false_elements);
            console.log($scope.results.true_count);
            console.log($scope.results.false_count);

        } catch(e){
              console.log("There was internal error when present_results tried to do its job.");
              $scope.results_error = "Hmm. Something went wrong behind the scenes. Try again and check console log for clues.";
          }  
        }

        var format_collection = function (collection){
            try{
                //There is some issue with browser's version of JSON.parse that needs more investigation - gives error even when correct object submitted. Need more investigation https://stackoverflow.com/questions/7123908/javascript-json-parser-that-tells-error-position
                //return  JSON.parse(JSON.stringify(collection));
                return eval("(" + collection + ")");
            } catch(e) {
                console.log("Error thrown when trying to parse collection, fall back to using it as a string.");
                return collection;
            }
        }

        var format_predicate = function (type, body){
            try{
                switch(type){
                    case 'str':
                    return body;
                    break;

                    case 'arr':
                    case 'obj':
                    //There is some issue with browser's version of  JSON.parse that needs more investigation - gives error even when correct object submitted. Need more investigation https://stackoverflow.com/questions/7123908/javascript-json-parser-that-tells-error-position
                    //return JSON.parse(JSON.stringify(body));
                    return eval("(" + body + ")");
                    break;

                    case 'fun_arg':
                    return new Function(["e"],body);
                    break;

                    default:
                    return body;
                }
            }catch(e){
                console.log("Error thrown when trying to parse predicate. Fall back to using a string predicate.")
                return body;
            }
        }

        //could use EC6 dynamic vars here and it would be one-liner most likely, but writing traditional code today and want to keep this file more persistant. 
        var run_function = function (f_name, collection, predicate){
            try{
                switch(f_name){
                    //[1,2,3,4,5,6,7,8,9,10,11,12]
                    // var num = parseInt(e); return num % 3 === 0
                    case 'filter':
                    return _f.filter(collection, predicate);
                    break;

                    case 'reject':
                    return _f.reject(collection, predicate);
                    break;

                    case 'every':
                    return _f.every(collection, predicate);
                    break;

                    case 'partition':
                    return _f.partition(collection, predicate);
                    break;

                    case 'some':
                    return _f.some(collection, predicate);
                    break;

                    default:
                    return [];
                }
            } catch(e){
                console.log("Error was thrown when trying to run a function in the controller. Returning empty array [] as a result.");
                return [];
            }
        }

        var get_size_of = function (collection){
            try{
                if(typeof collection.length != "undefined")return collection.length;
                var size = 0;
                if(typeof collection === "object" && typeof collection.length === "undefined"){
                    for(var prop in collection){
                        if(collection.hasOwnProperty(prop)){
                            size++;
                        }
                    }
                    return size;
                }
            }catch(e){
                return 0;
            }
        }
        //poluting  scope here, purely due to running out of time. Would otherwise dig into Highcharts docs more, put it into module with its own namespace and test suit        
        var makeChart = function() {
           if(typeof $scope === "undefined" || $scope.results === "undefined" || typeof $scope.results.true_count === "undefined" || $scope.results.true_count < 1 || typeof $scope.results.false_count === "undefined" || $scope.results.false_count < 1 )return;
           var true_count = $scope.results.true_count;
           var false_count =  $scope.results.false_count; 
           var noBorder = { 
                    states:{
                        hover:{
                            halo: {
                                size: 1
                            }     
                        }
                    }
                };
            
            Highcharts.setOptions({
                colors: ['#8edce7', '#b592dc']
            });
            
            var chart_time = new Highcharts.Chart({
                chart: {
                    renderTo: 'highchart-container',
                    type: 'pie',
                    margin: 0
                },

                plotOptions: {
                    pie: {
                            slicedOffset: 0,
                            size: '100%',
                            dataLabels: {
                            enabled: true
                        }
                    },
                    series : noBorder
                },
                tooltip: {
                    enabled: true,
                },

                title: {
                    text: 'Results',
                    align: 'center',
                    verticalAlign: 'middle',
                    style: {
                        fontSize: '16px'
                    }
                    
                },
                
                credits: {
                enabled: false
                },
                series: [{
                    name: 'Elements returned',
                    data: [["True",true_count],["False",false_count]],
                    innerSize: '60%',
                    showInLegend:false,
                    dataLabels: {
                        enabled: true,
                        distance: -25,
                        style: {
                            fontWeight: 'bold',
                            color: 'white',
                            textOutline:0
                        }
                    },
                    states:{
                        hover: {
                            enabled: true
                        }
                    }
                }]
            });
        }

    }]);

    //directives to validate input values for collections, arrays, function body
    app.directive('isObjectNotArray', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
        ctrl.$validators.isObjectNotArray = function(modelValue, viewValue) {
            try{
                //There is some issue with  browser's version of  JSON.parse that needs more investigation - gives error even when correct object submitted. Need more investigation https://stackoverflow.com/questions/7123908/javascript-json-parser-that-tells-error-position
                //var parsed_val = JSON.parse(JSON.stringify(viewValue));
                var parsed_val = eval("(" + viewValue + ")");
                if (typeof parsed_val === "object" && typeof parsed_val.length === "undefined") {
                return true;
                }
                return false;
            }
            catch(e){
                return false;
            }
            
        };
        }
    };
    });

    app.directive('isArrayOfTwo', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
        ctrl.$validators.isArrayOfTwo = function(modelValue, viewValue) {
            try{
                //There is some issue with  browser's version of JSON.parse that needs more investigation - gives error even when correct object submitted. Need more investigation https://stackoverflow.com/questions/7123908/javascript-json-parser-that-tells-error-position
                //var parsed_val = JSON.parse(JSON.stringify(viewValue));
                var parsed_val = eval("(" + viewValue + ")");
                if (typeof parsed_val === "object" && parsed_val.length === 2) {
                return true;
                }
                return false;
            }
            catch(e){
                return false;
            }
            
        };
        }
    };
    });

    app.directive('isString', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
        ctrl.$validators.isString = function(modelValue, viewValue) {
            if(typeof viewValue === "string") return true;
            return false;
        };
        }
    };
    });

    app.directive('isFunction', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
        ctrl.$validators.isFunction = function(modelValue, viewValue) {
            try{
                var user_func = new Function(["e"],viewValue);
                var e = ["yes","no"]
                user_func(e); // would not do this in a real word. Accepting user input and then running it is not a good idea.
                return true;
            } catch(e){
                return false;
            }
        };
        }
    };
    });

    /*  TODO: if have more time left, add more sofisticated validation and user feedback - eg. show back to user if her input 
        will be interpolated as object, array or string.
        */
    app.directive('isCollection', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
        ctrl.$validators.isCollection = function(modelValue, viewValue) {
            if(typeof viewValue === "string" && viewValue.length > 1) return true;
            return false;
        };
        }
    };
    });
})();