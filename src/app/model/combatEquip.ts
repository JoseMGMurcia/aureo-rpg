export class CombatEquip {
    private name: string;
    private initialDamage = 0;
    private activeDefence = 0;
    private armor = 0;
    private hands = 0;
    private precision = '';
    private price = 0;
    private atletism = 0;
    private sense = 0;

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

    public getInitialDamage(): number {
        return this.initialDamage;
    }

    public setInitialDamage(initialDamage: number): void {
        this.initialDamage = initialDamage;
    }

    public getActiveDefence(): number {
        return this.activeDefence;
    }

    public setActiveDefence(activeDefence: number): void {
        this.activeDefence = activeDefence;
    }

    public getArmor(): number {
        return this.armor;
    }

    public setArmor(armor: number): void {
        this.armor = armor;
    }

    public getHands(): number {
        return this.hands;
    }

    public setHands(hands: number): void {
        this.hands = hands;
    }

    public getPrecision(): string {
        return this.precision;
    }

    public setPrecision(precision: string): void {
        this.precision = precision;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public getAtletism(): number {
        return this.atletism;
    }

    public setAtletism(atletism: number): void {
        this.atletism = atletism;
    }

    public getSense(): number {
        return this.sense;
    }

    public setSense(sense: number): void {
        this.sense = sense;
    }

}
