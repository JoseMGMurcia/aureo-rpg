import { Modificator } from './modificator';

export class Skill {
    private name: string;
    private level: number;
    private mods: Modificator[] = [];

    constructor(name: string, level: number){
        this.level = level;
        this.name = name;
    }

    //Getter & Setter

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getLevel(): number {
        return this.level;
    }

    public setLevel(level: number): void {
        this.level = level;
    }

    public getMods(): Modificator[] {
        return this.mods;
    }

    public setMods(mods: Modificator[]): void {
        this.mods = mods;
    }
}
