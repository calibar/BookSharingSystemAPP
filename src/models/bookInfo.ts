export class BookInfoModel{
    public Id:number;
    public BookName :string;
    public BookAuthor :string;
    public BookDescription :string;
    public BookCover :string;
    public BookOwner :string;
    public BookBorrower :string;
    public Campus :string;
    public PostExpiration :string;
    public ExpectReturnTime :string;
    public ActualReturnTime :string;
    public OwnerRating :number;
    public BorrowerRating :number;
    public OwnerComment :string;
    public BorrowerComment :string;
    public BookStatus :string;

    constructor(){
        this.BookName="";
        this.BookAuthor="";
        this.BookDescription="";
        this.BookCover="";
        this.BookOwner="";
        this.BookBorrower=""
        this.Campus="";
        this.PostExpiration="";
        this.OwnerRating=0;
        this.BorrowerRating=0;
        this.OwnerComment="";
        this.BorrowerComment="";
        this.BookStatus="";


    }
}