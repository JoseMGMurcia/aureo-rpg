export class Modificator {
    private value: number;
    private name: string;
    private partial: boolean;

  constructor(value: number, name: string, partial: boolean = false){
      this.value = value;
      this.name = name;
      this.partial = partial;
  }

  public getValue(): number {
      return this.value;
  }

  public setValue(value: number): void {
      this.value = value;
  }

  public getName(): string {
      return this.name;
  }

  public setName(name: string): void {
      this.name = name;
  }

  public isPartial(): boolean {
    return this.partial;
  }

  public setPartial(partial: boolean): void {
      this.partial = partial;
  }
}
