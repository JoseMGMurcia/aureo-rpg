export class Power{
    private name = '';

    constructor(name: string){
        this.name = name;
    }

    //Getters & Setters

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }
}
