export class Gift {
  private name: string;
  private cost: number;

  constructor(name: string, cost: number){
    this.name = name;
    this.cost = cost;
  }

  //Getters & Setters

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getCost(): number {
        return this.cost;
    }

    public setCost(cost: number): void {
        this.cost = cost;
    }

}
