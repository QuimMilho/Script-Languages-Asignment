import React from 'react';

interface TimerProps {
    time: number;
    paused: boolean;
    onTick: (n: number) => void;
    ended: boolean;
    label?: string;
}
interface TimerState {
    time: number;
}

export default class extends React.Component<TimerProps, TimerState> {
    private it: NodeJS.Timer | undefined;

    constructor(props: TimerProps) {
        super(props);
        this.state = { time: this.props.time };
        this.startTimer();
    }

    render() {
        return (
            <div className='timer'>
                <span className='white'>
                    {this.props.label ? this.props.label : 'Tempo restante:'}
                </span>
                <div className='timeDisplay'>
                    {Math.floor(this.state.time / 600)}:
                    {Math.floor((this.state.time % 600) / 100)}
                    {Math.floor(((this.state.time % 600) % 100) / 10)}.
                    {this.state.time % 10}
                </div>
            </div>
        );
    }

    private startTimer() {
        this.it = setInterval(() => {
            if (this.props.ended) {
                return this.stopTimer();
            }
            if (!this.props.paused) {
                const t = this.state.time - 1;
                if (t === 0) this.stopTimer();
                this.props.onTick(t);
                this.setState({ time: t});
            }
        }, 100);
    }

    private stopTimer() {
        clearInterval(this.it);
    }
}
