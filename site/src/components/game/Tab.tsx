import "../../styles/game.scss";
import { generateRandomId } from "../../utils";

export default function (props: {
    tab: number[][];
    onChange?: (tab: number[][]) => void;
    nextPlayer: number;
    ended?: boolean;
    selectedTab?: number;
}) {
    let i = 0;
    return (
        <div className="tabuleiro">
            {props.tab.map((t) => (
                <div
                    key={generateRandomId(16)}
                    className={(() => {
                        let cls = "smallTab";
                        if (props.selectedTab !== undefined) {
                            if (props.selectedTab === i) {
                                cls += " selected";
                            }
                            i++;
                        }
                        return cls;
                    })()}
                >
                    {t.map((st) => (
                        <div
                            key={generateRandomId(16)}
                            className={(() => {
                                console.log(Math.floor(st / 100));
                                if (Math.floor(st / 100) === 1) {
                                    return "bluePiece";
                                } else if (Math.floor(st / 100) === 2) {
                                    return "redPiece";
                                }
                                if (props.ended) return "piece";
                                if (props.selectedTab !== undefined) {
                                    let i = Math.floor(((st % 100) - 1) / 9);
                                    if (i !== props.selectedTab) {
                                        return "piece";
                                    }
                                }
                                return props.nextPlayer === 1
                                    ? "bluePlaceholder"
                                    : "redPlaceholder";
                            })()}
                            onClick={() => {
                                if (Math.floor(st / 100) === 0) {
                                    const temp = [...props.tab];
                                    temp[Math.floor((st - 1) / 9)][
                                        (st - 1) % 9
                                    ] += props.nextPlayer * 100;
                                    if (props.onChange) props.onChange(temp);
                                }
                            }}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
}
