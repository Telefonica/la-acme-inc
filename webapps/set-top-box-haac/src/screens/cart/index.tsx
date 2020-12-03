import './cart.scss';

import React, { useState } from 'react';
import { NavigableWrapper, NavigableButton, screenReady, useAura } from '@telefonica/la-web-sdk';
import { CartScreenData, Entity, Operation } from '../../../../../dialogs/src/models';
import QuantitySelector from '../../components/QuantitySelector';

const CartScreen: React.FC<CartScreenData> = (cart: CartScreenData) => {
    const { games, totalPrice } = cart;
    const [quantity, setQuantity] = useState(games.map((game) => game.quantity));
    const { sendCommand } = useAura();
    const shipping = 0;

    const deleteItem = (gameId: string) => {
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
                    {games &&
                        games.map((game, index) => {
                            return (
                                <tr key={`cart-item-${index}`}>
                                    <td className="td-delete">
                                        <NavigableWrapper
                                            id={`cart-item-${index}`}
                                            defaultFocused={index === 0}
                                            onClick={() => deleteItem(game.id)}
                                            focusedClass="cart-screen__item-focused"
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
                                                value={quantity[index]}
                                                onDecrement={async () => {
                                                    setQuantity((q) => {
                                                        if (q[index] - 1 === 0) {
                                                            deleteItem(game.id);
                                                            q.splice(index, 1);
                                                            return [...q];
                                                        } else {
                                                            q[index] = q[index] - 1;
                                                            return [...q];
                                                        }
                                                    });
                                                    await sendCommand({
                                                        intent: Operation.QUANTITY_REMOVE,
                                                        entities: [{ type: Entity.GAMEID, entity: game.id }],
                                                    });
                                                }}
                                                onIncrement={async () => {
                                                    setQuantity((q) => {
                                                        q[index] = q[index] + 1;
                                                        return [...q];
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
                                makeFocused={true}
                                defaultClass="game-screen__button"
                            >
                                BACK
                            </NavigableButton>
                        </td>
                        <td className="cart-screen__table-footer-right">
                            <div className="cart-screen__table-footer-right__item">
                                <div>CART SUBTOTAL: </div>
                                <div>{totalPrice}€</div>
                            </div>
                            <div className="cart-screen__table-footer-right__item">
                                <div>SHIPPING: </div>
                                <div>{shipping === 0 ? 'FREE' : `${shipping}€`}</div>
                            </div>
                            <div className="cart-screen__table-footer-right__item">
                                <div>ORDER TOTAL: </div>
                                <div>{totalPrice + shipping}€</div>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default screenReady(CartScreen);
