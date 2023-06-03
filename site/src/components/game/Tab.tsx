import '../../styles/game.scss';
import {
    generateRandomId,
    getLargeTabPosition,
    getPiecePosition,
    getPieceType,
    getSmallTabPosition,
} from '../../utils';

export default function (props: {
    tab: number[][];
    onChange?: (tab: number[][], pos: number) => void;
    nextPlayer: number;
    ended?: boolean;
    selectedTab?: number;
}) {
    return (
        <div className='tabuleiro'>
            {props.tab.map((smallTab) => (
                <SmallTab
                    smallTab={smallTab}
                    nextPlayer={props.nextPlayer}
                    onPieceClick={(piece) =>
                        onPieceClick(
                            piece,
                            props.tab,
                            props.nextPlayer,
                            props.selectedTab,
                            props.ended,
                            props.onChange
                        )
                    }
                    ended={props.ended}
                    selectedTab={props.selectedTab}
                    key={generateRandomId(16)}
                />
            ))}
        </div>
    );
}

function SmallTab(props: {
    smallTab: number[];
    nextPlayer: number;
    selectedTab?: number;
    onPieceClick: (piece: number) => void;
    ended?: boolean;
}) {
    return (
        <div
            className={`smallTab ${isThisTabSelected(
                props.smallTab[0],
                props.selectedTab
            )}`}
        >
            {props.smallTab.map((piece) => (
                <Piece
                    className={getPieceClassName(
                        piece,
                        props.nextPlayer,
                        props.selectedTab,
                        props.ended
                    )}
                    onClick={() => props.onPieceClick(piece)}
                    key={generateRandomId(16)}
                />
            ))}
        </div>
    );
}

function Piece(props: { className: string; onClick: () => void }) {
    return <div className={props.className} onClick={props.onClick} />;
}

function isThisTabSelected(piece0: number, selectedTab?: number) {
    if (selectedTab === Math.floor((piece0 % 100) / 9)) return 'selected';
    return '';
}

function getPieceClassName(
    piece: number,
    nextPlayer: number,
    selectedTab?: number,
    ended?: boolean
) {
    if (getPieceType(piece) === 1) return 'bluePiece';
    if (getPieceType(piece) === 2) return 'redPiece';
    if (ended) return 'piece';
    if (wrongTab(piece, selectedTab)) return 'piece';
    if (nextPlayer === 1) return 'bluePlaceholder';
    if (nextPlayer === 2) return 'redPlaceholder';
    return 'piece';
}

function onPieceClick(
    piece: number,
    tab: number[][],
    nextPlayer: number,
    selectedTab?: number,
    ended?: boolean,
    onChange?: (tab: number[][], pos: number) => void
) {
    if (ended) return;
    if (wrongTab(piece, selectedTab)) return;
    if (getPieceType(piece) !== 0) return;
    const temp = [...tab];
    temp[getLargeTabPosition(piece)][getSmallTabPosition(piece)] +=
        nextPlayer * 100;
    if (onChange) onChange(temp, getPiecePosition(piece));
}

function wrongTab(piece: number, selectedTab?: number) {
    return (
        selectedTab !== undefined &&
        getLargeTabPosition(getPiecePosition(piece)) !== selectedTab
    );
}
