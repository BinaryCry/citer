var arr = [4,4,5,8,9,6,7,7,2,2,1,1,12,12];

function arrayUniqueCheck( arr ) {

    var tempArr = [];

    if( arr.length == 0 || arr.length > 1000 ) return false; // 0 < x < 1000

    for (var i = 0; i < arr.length; i++) {
        var count = null;
        for (var j = 0; j < arr.length; j++) {
            if( arr[i] == arr[j] ) {
                count++;
                var tempItem = arr[j];
            }

            if( j == arr.length-1 && count>1 ) {
                tempArr.push( tempItem );
            }
        }

    }
    console.log(tempArr);
}
arrayUniqueCheck(arr);