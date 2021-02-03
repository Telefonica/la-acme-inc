import './cart.scss';

import React, { useCallback, useState } from 'react';
import { NavigableWrapper, NavigableButton, screenReady, useAura } from '@telefonica/la-web-sdk';
import { CartScreenData, Entity, Operation } from '../../../../../dialogs/src/models';
import { QuantitySelector } from '@telefonica/la-components';

const CartScreen: React.FC<CartScreenData> = (cart: CartScreenData) => {
    const { games } = cart;
    const [stateGames, setStateGames] = useState([...games]);

    const { sendCommand } = useAura();
    const shipping = 0;

    const getTotalPrice = useCallback(() => {
        return stateGames.reduce((totalPrice, game) => totalPrice + game.price * game.quantity, 0);
    }, [stateGames]);

    const deleteItem = (gameId: string) => {
        setStateGames((games) => [...games.filter((game) => game.id !== gameId)]);
        sendCommand({ intent: Operation.REMOVE_CART, entities: [{ type: Entity.GAMEID, entity: gameId }] });
    };

    const goBack = () => {
        sendCommand({ intent: Operation.BACK, entities: [] });
    };

    return (
        <div className="cart-screen">
            <table>
                <thead>
                    <tr>
                        <th colSpan={2}>PRODUCT</th>
                        <th>PRICE</th>
                        <th>QUANTITY</th>
                        <th>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    {stateGames?.map((game, index) => {
                        return (
                            <tr key={`cart-item-${index}`}>
                                <td className="td-delete">
                                    {console.log('RE-RENDER')}
                                    <NavigableWrapper
                                        id={`cart-item-${index}`}
                                        onClick={() => deleteItem(game.id)}
                                        focusedClass="cart-screen__item-focused"
                                        makeFocused={index === 0}
                                    >
                                        <div>
                                            <div className="cart-screen__icon-delete">X</div>
                                        </div>
                                    </NavigableWrapper>
                                </td>
                                <td className="td-title">
                                    <div>{game.title}</div>
                                </td>
                                <td>
                                    <div>{game.price}</div>
                                </td>
                                <td>
                                    <div>
                                        <QuantitySelector
                                            value={game.quantity}
                                            onDecrement={async () => {
                                                setStateGames((games) => {
                                                    if (game.quantity - 1 === 0) {
                                                        deleteItem(game.id);
                                                        return [...games];
                                                    } else {
                                                        game.quantity = game.quantity - 1;
                                                        return [...games];
                                                    }
                                                });
                                                await sendCommand({
                                                    intent: Operation.QUANTITY_REMOVE,
                                                    entities: [{ type: Entity.GAMEID, entity: game.id }],
                                                });
                                            }}
                                            onIncrement={async () => {
                                                setStateGames((games) => {
                                                    if (game.quantity + 1 === 0) {
                                                        deleteItem(game.id);
                                                        return [...games];
                                                    } else {
                                                        game.quantity = game.quantity + 1;
                                                        return [...games];
                                                    }
                                                });
                                                await sendCommand({
                                                    intent: Operation.QUANTITY_ADD,
                                                    entities: [{ type: Entity.GAMEID, entity: game.id }],
                                                });
                                            }}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div>{game.quantity * game.price}€</div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr className="cart-screen__table-footer">
                        <td className="cart-screen__table-footer-left">
                            <NavigableButton
                                id="back"
                                onClick={goBack}
                                defaultFocused={true}
                                defaultClass="game-screen__button"
                            >
                                BACK
                            </NavigableButton>
                        </td>
                        <td className="cart-screen__table-footer-right">
                            <div className="cart-screen__table-footer-right__item">
                                <div>CART SUBTOTAL: </div>
                                <div>{getTotalPrice()}€</div>
                            </div>
                            <div className="cart-screen__table-footer-right__item">
                                <div>SHIPPING: </div>
                                <div>{shipping === 0 ? 'FREE' : `${shipping}€`}</div>
                            </div>
                            <div className="cart-screen__table-footer-right__item">
                                <div>ORDER TOTAL: </div>
                                <div>{getTotalPrice() + shipping}€</div>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default screenReady(CartScreen);
