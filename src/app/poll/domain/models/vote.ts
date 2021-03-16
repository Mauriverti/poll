export class Vote {

  constructor(
    public id: string,
    public voter: string,
    public pollId: string,
    public option: string, // this should be the index, but it's like this to easily show the option on voted list component
    public pollTitle: string, // this is duplicated here to easily show the title on voted list component
  ) { }
}
