export class GodAffinity{
    private god: string;
    private affinity: number;
    private aretes: number;
    private hamartias: number;

    constructor(god: string, affinity: number, aretes: number, hamartias: number){
        this.god = god;
        this.affinity =affinity;
        this.aretes = aretes;
        this.hamartias = hamartias;
    }

    //Getters & Setters

    public getGod(): string {
        return this.god;
    }

    public setGod(god: string): void {
        this.god = god;
    }

    public getAffinity(): number {
        return this.affinity;
    }

    public setAffinity(affinity: number): void {
        this.affinity = affinity;
    }

    public getAretes(): number {
        return this.aretes;
    }

    public setAretes(aretes: number): void {
        this.aretes = aretes;
    }

    public getHamartias(): number {
        return this.hamartias;
    }

    public setHamartias(hamartias: number): void {
        this.hamartias = hamartias;
    }
}
