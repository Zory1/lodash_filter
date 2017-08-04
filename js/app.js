var app = angular.module('lodash', []);

//directives to validate input values for collections, arrays, function body
app.directive('isObjectNotArray', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.isObjectNotArray = function(modelValue, viewValue) {
        try{
            var parsed_val = JSON.parse(viewValue);

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
            var parsed_val = JSON.parse(viewValue);

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
            user_func(e); // would never do this in a real word. Accepting user input and then running it is never a good idea.
            return true;
        } catch(e){
            return false;
        }
      };
    }
  };
});

/*  TODO: add more sofisticated validation and user feedback - eg. show back to user if her input 
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