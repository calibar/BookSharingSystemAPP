export class MessageInfoModel{
    public Sender:string;
    public Receiver:string;
    public Content:string;
    public MsgType:string;
    public IsDealed:boolean;
    constructor(){
        this.Sender="";
        this.Receiver="";
        this.Content="";
        this.MsgType="";
        this.IsDealed=false;
    }
}