import { Modificator } from './modificator';

export class Atributes {
    private agility: Atribute;
    private comunication: Atribute;
    private reflexes: Atribute;

    private soul: Atribute;
    private strength: Atribute;
    private resistance: Atribute;

    private appearance: Atribute;
    private mind: Atribute;
    private sense: Atribute;

    constructor(){
        this.agility = new Atribute(1);
        this.comunication = new Atribute(1);
        this.reflexes = new Atribute(1);
        this.soul = new Atribute(1);
        this.strength = new Atribute(1);
        this.resistance = new Atribute(1);
        this.appearance = new Atribute(1);
        this.mind = new Atribute(1);
        this.sense = new Atribute(1);
    }

    //Getters & Setters

    public getAgility(): Atribute {
        return this.agility;
    }

    public setAgility(agility: Atribute): void {
        this.agility = agility;
    }

    public getComunication(): Atribute {
        return this.comunication;
    }

    public setComunication(comunication: Atribute): void {
        this.comunication = comunication;
    }

    public getReflexes(): Atribute {
        return this.reflexes;
    }

    public setReflexes(reflexes: Atribute): void {
        this.reflexes = reflexes;
    }

    public getSoul(): Atribute {
        return this.soul;
    }

    public setSoul(soul: Atribute): void {
        this.soul = soul;
    }

    public getStrength(): Atribute {
        return this.strength;
    }

    public setStrength(strength: Atribute): void {
        this.strength = strength;
    }

    public getResistance(): Atribute {
        return this.resistance;
    }

    public setResistance(resistance: Atribute): void {
        this.resistance = resistance;
    }

    public getAppearance(): Atribute {
        return this.appearance;
    }

    public setAppearance(appearance: Atribute): void {
        this.appearance = appearance;
    }

    public getMind(): Atribute {
        return this.mind;
    }

    public setMind(mind: Atribute): void {
        this.mind = mind;
    }

    public getSense(): Atribute {
        return this.sense;
    }

    public setSense(sense: Atribute): void {
        this.sense = sense;
    }
}

export class Atribute {
    private value: number;
    private mods: Modificator[];

    constructor(value: number){
        this.value = value;
        this.mods = [];
    }

     //Getters & Setters
    public getValue(): number {
        return this.value;
    }

    public setValue(value: number): void {
        this.value = value;
    }

    public getMods(): Modificator[] {
        return this.mods;
    }

    public setMods(mods: Modificator[]): void {
        this.mods = mods;
    }
}
