export class Companion{
    private name: string;
    private player: string;
    private cult: string;

    constructor(name: string, player: string, cult: string){
        this.name = name;
        this.player = player;
        this.cult = cult;
    }

    //Getters & Setters

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getPlayer(): string {
        return this.player;
    }

    public setPlayer(player: string): void {
        this.player = player;
    }

    public getCult(): string {
        return this.cult;
    }

    public setCult(cult: string): void {
        this.cult = cult;
    }

}
