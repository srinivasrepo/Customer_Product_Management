export class CommonMethods{
   
 
    public static formatString(str:string, arr:Array<any>):string{
        arr.forEach((item, index)=>{
            str = str.replace('{' + index.toString() + '}', item)
            
        });
        return str;
    }

    public static hasValue(value: any){
        var isValueEmpty:boolean = true;
        if(value=="" || value==null || value==undefined || value=="null" || value=="undefined")
         isValueEmpty=false;
        else if(`${value}`.trim()=="" || value==0)
         isValueEmpty=false;  

        return isValueEmpty; 
    }

    public static increaseSNO(list:Array<any>){
        list.forEach((item,index)=>{
            list[index].sno=index + 1 ;
        })
        return list;   
    }
}