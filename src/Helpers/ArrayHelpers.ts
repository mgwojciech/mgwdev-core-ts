export class ArrayHelper{
    public static FindValueByKey(array: {Key?: string, Value?: string}[], key: string) : string{
        let temp = array.find((item)=>{
            return item.Key == key
        });
        if(temp && temp.Value)
            return temp.Value;
        return "";
    }
}