export class MenuPosition {
    constructor(public x: number, public y: number) {}

    get anchorPosition() {
        return {
            left: this.x + 2,
            top: this.y - 6,
        };
    }
}
