var assert = require('assert');

function byteSize(str){
        return Buffer.byteLength(JSON.stringify(str), 'utf8');
    }


module.exports = {
    splitArrayPart1: function(input, maxLength) {
        let len = input.length;
        let result = [[]];
        let k=0, j=0;

        for( let i=0; i<len; ++i){
            if( j >= maxLength){
                ++k;
                j=0;
                result.push([]);
            }
            result[k].push(input[i]);
            ++j;
        }


        return result;

    },

    splitArrayPart1Slice: function(input, maxLength) {
       let len = input.length;

       if( len == 0){
           return [[]];
       }

       let result = [];

       for( let i=0; i<len; i+=maxLength){
           result.push(input.slice(i,i+maxLength));
       }

       return result;
            
    },

    splitArrayPart2: function(input, maxLength) {
        let len = input.length;
        let result = [];
        let numchars=0, start=0;

        for( let i=0; i<len; ++i){
            let curstrlen = input[i].length;

            if( (numchars + curstrlen) > maxLength) {
                //Assert if any of our strings are bigger that the max length (Can't send an array small enough).
                assert(curstrlen <=  maxLength, 'One of the string in the input array is longer than the max string length');
                //we're over max length.  create a sub array for everything up to n - 1 
                result.push(input.slice(start, i));
                start = i;
                numchars = 0;
            }
            numchars += curstrlen;
        }

        // pack on the last element
        result.push(input.slice(start, len));


        return result;

    },


    splitArrayPart3: function(input, maxBytesize)  {
        let len = input.length;
        let result = [];
        //curByteLength starts at 2 for the 2 bytes for outer brackets
        let curByteLength=2, start=0;

        for( let i=0; i<len; ++i){
            let curStringByteLen = byteSize(input[i])+2; //+2 for the quotes

            if( (curByteLength + curStringByteLen) > maxBytesize) {
                //Assert if any of our strings are bigger that the max length (Can't send an array small enough).
                assert(curStringByteLen <=  maxBytesize, 'One of the string in the input array is longer than the max string length');
                //we're over max length.  create a sub array for everything up to n - 1 
                result.push(input.slice(start, i));
                start = i;
                curByteLength = 2;
            }
            curByteLength += curStringByteLen;
        }

        // pack on the last element
        result.push(input.slice(start, len));


        return result;

    },

    byteSize: byteSize 
    
 
};

    
