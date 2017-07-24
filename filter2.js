    //filter() takes in collection and a function, returns array of collection's elements that had been evaluated to 'true' by the function passed to filter().
    const filter2 = (list, fn) => {
      //debugger;
    const f_array_with_function = (list,fn) => {
        let ans = [];
        for (let i = 0; i < list.length; i++) {
            if (fn(list[i])) {
                ans.push(list[i]);
            }
        }
        return ans;
      }

      const f_object_with_function = (list,fn) => {
        let ans = [];
        for(let prop in list){
            if(list.hasOwnProperty(prop) && fn(list[prop])){
                ans.push(list[prop]);
            }
        }
        return ans;
      }

      const answer = [];

      switch(typeof list){
        //list is a string
        case "string":
            f_array_with_function(list,fn);
        break;

        //list is an array
        case "object":
            f_object_with_function(list,fn);
        break;
      }
      return answer;
    };