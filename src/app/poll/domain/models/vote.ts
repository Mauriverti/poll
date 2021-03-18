export class Vote {

  constructor(
    /** Vote's identifier */
    public id: string,
    /** It references the user that voted */
    public voter: string,
    /** It references which poll belongs this vote  */
    public pollId: string,
    /** It references the option that user selected on poll */
    public option: string, // this should be the index, but it's like this to easily show the option on voted list component
    /** poll's title */
    public pollTitle: string, // this is duplicated here to easily show the title on voted list component
  ) { }
}
