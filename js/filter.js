    //filter() takes in collection and a function, returns array of collection's elements that had been evaluated to 'true' by the function passed to filter().
    const filter = (list, fn) => {
      //debugger;
      const answer = [];
      if(typeof fn === "string"){
      //we did not get a function passed in, just a string
        if(typeof list.length != "undefined"){
        //we got an array passed in
          for (let i = 0; i < list.length; i++) {
            if (typeof list[i] === "object" && list[i].hasOwnProperty(fn) && list[i][fn]) {
            //array of objects was passed in
              answer.push(list[i]);
            } else{
              if(list[i] === fn){
              //it is either string or number or boolean
                answer.push(list[i]);
              }
            }
          }
        } else {
          if(typeof list === "object"){           
            if(list.hasOwnProperty(fn) && list[fn]){
              answer.push(list);
            }
          }
        }
      } else {//we got a function passed in
        if( typeof list.length != "undefined" ){
          for (let i = 0; i < list.length; i++) {
            if (fn(list[i])) {
              answer.push(list[i]);
            }
          }
        } else {
          if(typeof list === "object"){
            for(let prop in list){
              if(list.hasOwnProperty(prop) && fn(list[prop])){
                answer.push(list[prop]);
              }
            }
          }
        }
      }


      
      console.log(answer);
      return answer;
    };