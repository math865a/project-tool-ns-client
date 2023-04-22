export class Rate {
    default: number;
    overtime: number;
    constructor(props: { default: number; overtime: number }) {
        this.default = props.default;
        this.overtime = props.overtime;
    }
}
