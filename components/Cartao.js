import React from 'react';
import { View, StyleSheet } from 'react-native';


const Cartao = (props) => {

    return(

        <View style={{ ...estilos.cartao, ...props.estilos }}>
            {props.children}
        </View>
    );
};

const estilos = StyleSheet.create({
    cartao: {
        alignItems: 'center',
        shadowColor: 'blue',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: 'darkgray',
        elevation: 5,
        padding: 20,
    } 
});

export default Cartao;
