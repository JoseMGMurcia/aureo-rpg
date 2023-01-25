export class Follower{
    private name: string;
    private arquetype: string;
    private combat: number;
    private physical: number;
    private espiritual: number;
    private mental: number;
    private social: number;

    constructor(name: string){
        this.name= name;
    }

    //Getters & Setters

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getArquetype(): string {
        return this.arquetype;
    }

    public setArquetype(arquetype: string): void {
        this.arquetype = arquetype;
    }

    public getCombat(): number {
        return this.combat;
    }

    public setCombat(combat: number): void {
        this.combat = combat;
    }

    public getPhysical(): number {
        return this.physical;
    }

    public setPhysical(physical: number): void {
        this.physical = physical;
    }

    public getSpiritual(): number {
        return this.espiritual;
    }

    public setEspiritual(espiritual: number): void {
        this.espiritual = espiritual;
    }

    public getMental(): number {
        return this.mental;
    }

    public setMental(mental: number): void {
        this.mental = mental;
    }

    public getSocial(): number {
        return this.social;
    }

    public setSocial(social: number): void {
        this.social = social;
    }

}
