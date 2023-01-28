export class Power{
    private name = '';
    private minimumAfinity = '';
    private action = '';
    private specialResistAction = '';
    private effect = '';
    private cost = '';
    private duration = '';

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
