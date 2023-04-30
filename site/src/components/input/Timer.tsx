import React from "react";

interface TimerProps {
    time: number;
    ended: boolean;
    onTick: (n: number) => void;
    label?: string;
}
interface TimerState {
    time: number;
}

export default class extends React.Component<TimerProps, TimerState> {
    private it: NodeJS.Timer | undefined;

    constructor(props: TimerProps) {
        super(props);
        this.state = {time: this.props.time};
        this.startTimer();
    }

    render() {
        return (
            <div className="timer">
                <span className="white">
                    {this.props.label ? this.props.label : "Tempo restante:"}
                </span>
                <div className="timeDisplay">
                    {Math.floor(this.state.time / 60)} :{" "}
                    {Math.floor((this.state.time % 60) / 10)}
                    {(this.state.time % 60) % 10}
                </div>
            </div>
        );
    }

    private startTimer() {
        this.it = setInterval(() => {
            if (!this.props.ended) {
                this.props.onTick(this.state.time - 1);
                this.setState({ time: this.state.time - 1 });
            } else {
                this.stopTimer();
            }
        }, 1000);
    }

    private stopTimer() {
        clearInterval(this.it);
    }
}
