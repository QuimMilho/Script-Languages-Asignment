import { useEffect, useState } from 'react';
import '../../styles/game.scss';
import {
    generateRandomId,
    getLargeTabPosition,
    getPiecePosition,
    getPieceType,
    getSmallTabPosition,
} from '../../utils';
import { gameInfo } from '../../types';

export default function (props: {
    jogo: gameInfo;
    onChange?: (tab: number[][], pos: number) => void;
}) {
    const [pos, setPos] = useState<number>(0);

    const keyDown = (event: KeyboardEvent) => {
        const key = event.key;
        const smallTabPos = getSmallTabPosition(pos);
        const largeTabPos = getLargeTabPosition(pos);
        let position;
        if (verifyUp(key)) {
            event.preventDefault();
            position = moveUp(
                pos,
                smallTabPos,
                largeTabPos,
                props.jogo.nextTab
            );
        } else if (verifyDown(key)) {
            event.preventDefault();
            position = moveDown(
                pos,
                smallTabPos,
                largeTabPos,
                props.jogo.nextTab
            );
        } else if (verifyLeft(key)) {
            event.preventDefault();
            position = moveLeft(
                pos,
                smallTabPos,
                largeTabPos,
                props.jogo.nextTab
            );
        } else if (verifyRight(key)) {
            event.preventDefault();
            position = moveRight(
                pos,
                smallTabPos,
                largeTabPos,
                props.jogo.nextTab
            );
        } else if (verifyEnter(key)) {
            event.preventDefault();
            const temp = playPosition(
                pos,
                props.jogo.tab,
                props.jogo.player,
                smallTabPos,
                largeTabPos
            );
            if (props.onChange && temp) {
                props.onChange(temp, pos);
                return setPos(0);
            }
            return;
        } else return console.log(key);
        if (position <= 0 || position > 81) return;
        setPos(position);
    };

    useEffect(() => {
        document.addEventListener('keydown', keyDown);
        return () => document.removeEventListener('keydown', keyDown);
    }, [pos, props.jogo.nextTab]);
    return (
        <div className='tabuleiro'>
            {props.jogo.tab.map((smallTab) => (
                <SmallTab
                    smallTab={smallTab}
                    nextPlayer={props.jogo.player}
                    pos={pos}
                    onPieceClick={(piece) => {
                        onPieceClick(
                            piece,
                            props.jogo.tab,
                            props.jogo.player,
                            props.jogo.nextTab,
                            props.jogo.ended !== 0,
                            props.onChange
                        );
                        setPos(0);
                    }}
                    ended={props.jogo.ended !== 0}
                    selectedTab={props.jogo.nextTab}
                    key={generateRandomId(16)}
                />
            ))}
        </div>
    );
}

function SmallTab(props: {
    smallTab: number[];
    nextPlayer: number;
    pos: number;
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
                        props.pos,
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
    selected: number,
    selectedTab?: number,
    ended?: boolean
) {
    let pieceSelected = '';
    if (getPiecePosition(piece) === selected) {
        if (nextPlayer === 1) pieceSelected = 'bluePlacementBorder';
        if (nextPlayer === 2) pieceSelected = 'redPlacementBorder';
    }
    if (getPieceType(piece) === 1) return `bluePiece ${pieceSelected}`;
    if (getPieceType(piece) === 2) return `redPiece ${pieceSelected}`;
    if (ended) return 'piece';
    if (wrongTab(piece, selectedTab)) return 'piece';
    if (piece === selected) {
        if (nextPlayer === 1) return 'bluePlacement';
        if (nextPlayer === 2) return 'redPlacement';
    }
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

function verifyRight(key: string) {
    return key === 'ArrowRight' || key.toLowerCase() === 'd';
}

function moveRight(
    position: number,
    smallTabPos: number,
    largeTabPos: number,
    selectedTab?: number
): number {
    if (selectedTab !== undefined) {
        if (position === 0) return selectedTab * 9 + 5;
        else if (smallTabPos % 3 === 2) {
            return position - 2;
        } else return position + 1;
    } else {
        if (position === 0) return 41;
        else if (smallTabPos % 3 === 2) {
            if (largeTabPos % 3 === 2) return position - 20;
            else return position + 7;
        } else return position + 1;
    }
}

function verifyUp(key: string) {
    return key === 'ArrowUp' || key.toLowerCase() === 'w';
}

function moveUp(
    position: number,
    smallTabPos: number,
    largeTabPos: number,
    selectedTab?: number
): number {
    if (selectedTab !== undefined) {
        if (position === 0) return selectedTab * 9 + 5;
        if (smallTabPos < 3) {
            return position + 6;
        } else return position - 3;
    } else {
        if (position === 0) return 41;
        else if (smallTabPos < 3) {
            if (largeTabPos < 3) return position + 60;
            else return position - 21;
        } else return position - 3;
    }
}

function verifyDown(key: string) {
    return key === 'ArrowDown' || key.toLowerCase() === 's';
}

function moveDown(
    position: number,
    smallTabPos: number,
    largeTabPos: number,
    selectedTab?: number
): number {
    if (selectedTab !== undefined) {
        if (position === 0) return selectedTab * 9 + 5;
        else if (smallTabPos > 5) {
            return position - 6;
        } else return position + 3;
    } else {
        if (position === 0) return 41;
        else if (smallTabPos > 5) {
            if (largeTabPos > 5) return position - 60;
            else return position + 21;
        } else return position + 3;
    }
}

function verifyLeft(key: string) {
    return key === 'ArrowLeft' || key.toLowerCase() === 'a';
}

function moveLeft(
    position: number,
    smallTabPos: number,
    largeTabPos: number,
    selectedTab?: number
): number {
    if (selectedTab !== undefined) {
        if (position === 0) return selectedTab * 9 + 5;
        else if (smallTabPos % 3 === 0) {
            return position + 2;
        } else return position - 1;
    } else {
        if (position === 0) return 41;
        else if (smallTabPos % 3 === 0) {
            if (largeTabPos % 3 === 0) return position + 20;
            else return position - 7;
        } else return position - 1;
    }
}

function verifyEnter(key: string) {
    return key === ' ' || key === 'Enter';
}

function playPosition(
    position: number,
    tab: number[][],
    player: number,
    smallTabPos: number,
    largeTabPos: number
) {
    if (position === 0) return;
    if (getPieceType(tab[largeTabPos][smallTabPos]) !== 0) return;
    const temp = [...tab];
    temp[largeTabPos][smallTabPos] += player * 100;
    return temp;
}
