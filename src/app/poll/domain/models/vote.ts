export class Vote {

  constructor(
    public id: string,
    public voter: string,
    public pollId: string,
    public option: number
  ) { }
}
