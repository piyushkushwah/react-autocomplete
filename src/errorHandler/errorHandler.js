export default function handleError(data,key){
    return !data || data[key] === undefined ? false : true;
}