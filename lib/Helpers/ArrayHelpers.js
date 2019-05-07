export class ArrayHelper {
    static FindValueByKey(array, key) {
        let temp = array.find((item) => {
            return item.Key == key;
        });
        if (temp && temp.Value)
            return temp.Value;
        return "";
    }
}
