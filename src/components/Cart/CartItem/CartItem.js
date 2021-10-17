import React from 'react';
import useStyles from './styles';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

const CartItem = ({ lineItem, handleUpdateCartQuantity, handleRemoveFromCart }) => {
    const classes = useStyles();
    return (
        <Card>
            <CardMedia image={lineItem.image.url} alt={lineItem.name} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant="h4">
                    {lineItem.name}
                </Typography>
                <Typography variant='h5'>
                    {lineItem.line_total.formatted_with_symbol}
                </Typography>
            </CardContent>
            <CardActions className={classes.CardActions}>
                <div className={classes.buttons}>
                    <Button type='button' size='small' onClick={ () => handleUpdateCartQuantity(lineItem.id, lineItem.quantity - 1) } >-</Button>
                    <Typography>{lineItem.quantity}</Typography>
                    <Button type='button' size='small' onClick={ () => handleUpdateCartQuantity(lineItem.id, lineItem.quantity + 1) }>+</Button>
                </div>
                <Button variant="contained" type="button" color="secondary" onClick={ () => handleRemoveFromCart(lineItem.id)}>Remove</Button>
            </CardActions>
        </Card>
    );
}

export default CartItem;