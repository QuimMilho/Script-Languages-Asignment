import {Component} from 'react';
import { TimerProps, TimerState } from '../../types';

export default class extends Component<TimerProps, TimerState> {
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
                    {this.getTimeString(this.state.time)}
                </div>
            </div>
        );
    }

    private startTimer() {
        this.it = setInterval(() => {
            if (this.props.ended) return this.stopTimer();
            if (!this.props.paused) this.updateTimer();
        }, 100);
    }

    private updateTimer() {
        const time = this.state.time - 1;
        if (time === 0) this.stopTimer();
        this.props.onTick(time);
        this.setState({ time });
    }

    private stopTimer() {
        clearInterval(this.it);
    }

    private getTimeString(time: number) {
        const minutes = Math.floor(time / 600);
        const seconds = Math.floor(time / 10) % 60;
        const secondsDez = Math.floor(seconds / 10);
        const secondsUnits = seconds % 10;
        const undreds = time % 10;
        return `${minutes}:${secondsDez}${secondsUnits}.${undreds}`;
    }
}
