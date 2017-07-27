 /* 
    In:     list and predicate.
    Out:    array of elements that do not match the predicate.
    List can be: array of strings | numbers | objects, or object, or string. 
    Predicates can be:
        - Function
        - The `_.matches` iteratee shorthand (object)
        - The `_.matchesProperty` iteratee shorthand (array of 2 strings)
        - The `_.property` iteratee shorthand (string)
*/

const partition = (list, fn) => {
 let answer = [];

    //1. start:    define functions for different predicates
    const f_array_with_function = (list,fn) => {
        let ans = [];
        ans[0] = [];
        ans[1] = [];

        for (let i = 0; i < list.length; i++) {
            if (fn(list[i])) {
                ans[0].push(list[i]);
            } else {
                ans[1].push(list[i]);
            }
        }
        return ans;
    }

    const f_object_with_function = (list,fn) => {
        let ans = [];
        ans[0] = [];
        ans[1] = [];

        if(typeof list != "object") return ans;
        for(let prop in list){
            if(list.hasOwnProperty(prop) && fn(list[prop])){
                ans[0].push(list[prop]);
            } else {
                ans[1].push(list[prop]);
            }
        }
        return ans;
    }

    const f_arr_of_objects_with_object = (list,fn) =>{
        let ans = [];
        ans[0] = [];
        ans[1] = [];

        if(typeof list.length != "undefined"){
            for(let i = 0; i < list.length; i++){  
                if(typeof list[i] === "object" && typeof list[i].length === "undefined"){
                    let matched_prop = 0;
                    let matched_prop_val = 0;
                    for(let prop in fn){
                        if(fn.hasOwnProperty(prop)){
                            if(typeof list[i][prop] != "undefined") matched_prop++;
                            if(typeof list[i][prop] != "undefined" && fn[prop] === list[i][prop]) matched_prop_val++;
                        }
                    }
                    if(matched_prop > 0 && matched_prop === matched_prop_val) {
                        ans[0].push(list[i]);  
                    } else {
                        ans[1].push(list[i]);
                    }     
                }
            }
        }
        return ans;
    }
    const f_arr_of_objects_with_array = (list,fn) =>{
        let ans = [];
        ans[0] = [];
        ans[1] = [];

        if(typeof list.length != "undefined"){
            for(let i = 0; i < list.length; i++){  
                if(typeof list[i] === "object" && typeof list[i].length === "undefined" && list[i][fn[0]] === fn[1]){
                    ans[0].push(list[i]);
                } else {
                    ans[1].push(list[i]);
                }
            }
        }
        return ans;
    }
    const f_arr_of_objects_with_string = (list,fn) =>{
        let ans = [];
        ans[0] = [];
        ans[1] = [];

        if(typeof list.length != "undefined"){
            for(let i = 0; i < list.length; i++){  
                if(typeof list[i] === "object" && typeof list[i].length === "undefined" && list[i][fn]){
                    ans[0].push(list[i]);
                } else {
                    ans[1].push(list[i]);
                }
            }
        }
        return ans;
    }
    //1. end:      define functions for different predicates
    
    //2. start:    determine which function to use
    switch(typeof fn){
        case "function":          
            if(typeof list.length != "undefined"){
                answer = f_array_with_function(list,fn);
            } else {
                answer = f_object_with_function(list,fn);
            }
        break;

        case "object":
            if(typeof list === "string")return answer; //return empty array as string and object combination is not supported
            
            if(typeof fn.length != "undefined" && fn.length > 1){
                answer = f_arr_of_objects_with_array(list, fn);
            } else {
                answer = f_arr_of_objects_with_object(list, fn);
            }
        break;

        case "string":
            if(typeof list === "string") return answer;//return empty array as the `_.property` iteratee shorthand not supported with strings

            if(typeof list.length != "undefined"){
                answer = f_arr_of_objects_with_string(list, fn);
            } else {
                return answer;
            }
        break;
    }
    //3. return answer
    return answer;

};