export class MessageWithTimeModel{
    public Id:number
    public Sender:string;
    public Receiver:string;
    public Content:string;
    public MsgType:string;
    public IsDealed:boolean;
    public SendingTime:string;
    constructor(){
        this.Id=0;
        this.Sender="";
        this.Receiver="";
        this.Content="";
        this.MsgType="";
        this.IsDealed=false;
        this.SendingTime="";
    }
}