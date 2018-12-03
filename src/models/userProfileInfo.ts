export class UserProfileInfoModel{
    public Username : string;
    public BorrowCount:number;
    public Nickname :string;
    public Email :string;
    public Avatar :string;
    public Badge :string;
    public Campus :string;
    public EmailVerifyed :boolean;
    public LendCount:number;
    public PostCount:number;
    public Rank: number;
    public RequestCount: number;
    public Score: number;
    public StudentId: string;
    constructor(){
        this.Username="";
        this.BorrowCount=0;
        this.Nickname="";
        this.Email="";
        this.Avatar="";
        this.Badge="";
        this.Campus="";
        this.EmailVerifyed=false;
        this.LendCount=0;
        this.PostCount=0;
        this.Rank=null;
        this.RequestCount=0;
        this.Score=0;
        this.StudentId="";
    }
}