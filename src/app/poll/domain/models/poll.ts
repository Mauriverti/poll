export class Poll {
  constructor(
  public id: string,
  public title: string,
  public description: string,
  public publicPoll: boolean,
  public createdBy: string,
  public options: string[]
  ) { }
}
