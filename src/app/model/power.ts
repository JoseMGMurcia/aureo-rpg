export class Power{
    private name: string = '';
    private minimumAfinity: string = '';
    private action: string = '';
    private specialResistAction: string = '';
    private effect: string = '';
    private cost: string = '';
    private duration: string = '';

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

    public getMinimumAfinity(): string {
        return this.minimumAfinity;
    }

    public setMinimumAfinity(minimumAfinity: string): void {
        this.minimumAfinity = minimumAfinity;
    }

    public getAction(): string {
        return this.action;
    }

    public setAction(action: string): void {
        this.action = action;
    }

    public getSpecialResistAction(): string {
        return this.specialResistAction;
    }

    public setSpecialResistAction(specialResistAction: string): void {
        this.specialResistAction = specialResistAction;
    }

    public getEffect(): string {
        return this.effect;
    }

    public setEffect(effect: string): void {
        this.effect = effect;
    }

    public getCost(): string {
        return this.cost;
    }

    public setCost(cost: string): void {
        this.cost = cost;
    }

    public getDuration(): string {
        return this.duration;
    }

    public setDuration(duration: string): void {
        this.duration = duration;
    }
}
