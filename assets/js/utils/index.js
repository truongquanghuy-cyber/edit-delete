function findIndex(arr, key) {
    let index = -1;
    for(let i = 0; i < arr.length; i++){
        const item = arr[i];

        if(item.id == key){
            return i
        }
    }

    return -1;
}

