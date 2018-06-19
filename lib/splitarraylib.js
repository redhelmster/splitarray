var assert = require('assert');


const ENCODING = 'utf8';
const BRACKET_BYTESIZE = byteSize([]);
const QUOTE_BYTESIZE = byteSize('');
const COMMA_BYTESIZE = byteSize(',') - QUOTE_BYTESIZE;


function byteSize(str){
        return Buffer.byteLength(JSON.stringify(str), ENCODING);
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
        let curByteLength=BRACKET_BYTESIZE , start=0;

        for( let i=0; i<len; ++i){
            let curStringByteLen = byteSize(input[i]) + QUOTE_BYTESIZE ; //+2 for the quotes

            if( (curByteLength + curStringByteLen) > maxBytesize) {
                //Assert if any of our strings are bigger that the max length (Can't send an array small enough).
                assert(curStringByteLen <=  maxBytesize, 'One of the string in the input array is longer than the max string length');
                //we're over max length.  create a sub array for everything up to n - 1 
                result.push(input.slice(start, i));
                start = i;
                curByteLength = BRACKET_BYTESIZE;
            }
            curByteLength += curStringByteLen + COMMA_BYTESIZE;
        }

        // pack on the last element
        result.push(input.slice(start, len));
        
        console.log("comman" + COMMA_BYTESIZE);
        return result;

    },

    byteSize: byteSize 
    
 
};

    
