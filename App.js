import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Keyboard, TouchableOpacity } from 'react-native';
import PrevisaoItem from './components/PrevisaoItem';

export default function App() {

  const [cidade, setCidade] = useState('');

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [fellsLike, setFellsLike] = useState("");
  const [image, setImage] = useState("");



  const capturaCidade = (cidade) => {
    setCidade(cidade);
  }

  const endPoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  const oneCall = "https://api.openweathermap.org/data/2.5/onecall";

  const apiKey = "607822f6657c454c8c03856530774df4";

  const obtemPrevisoes = () => {

    const target = endPoint + cidade + "&appid=" + apiKey;
    fetch(target)
      .then((dados) => dados.json())
      .then((dados) => {

        setLatitude(dados.coord.lat)
        setLongitude(dados.coord.lon)

        Keyboard.dismiss()

      });

  };



  const obterPrevisao = (latitude, longitude) => {

    const target = oneCall + "?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=" + apiKey;
    fetch(target)
      .then((dados) => dados.json())
      .then((dados) => {

        setSunrise(dados.current.sunrise)
        setSunset(dados.current.sunset)
        setFellsLike(dados.current.feels_like)
        setImage(dados.current.weather[0].icon)


      })
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.entrada}>
        <Text style={estilos.titulo}>Previsão do Tempo</Text>
        <TextInput
          style={estilos.nomeCidade}
          placeholder="Digite o nome da Cidade"
          value={cidade}
          onChangeText={capturaCidade}
        />
        <TouchableOpacity
          style={estilos.btn}
          title="Ok"
          onPress={() => { obtemPrevisoes, obterPrevisao(latitude, longitude) }}>
          <Text >Enviar</Text>
        </TouchableOpacity>

      </View>
      <View style={estilos.previsao}>
        <PrevisaoItem
          amanhecer={sunrise}
          anoitecer={sunset}
          sensacao={fellsLike}
          imagem={image}
        />

      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    padding: 40,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff'
  },
  nomeCidade: {
    fontSize: 20,
    borderColor: 'deepskyblue',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    marginBottom: 0,
    padding: 15,
  },
  entrada: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 100,
 
    paddingBottom: 0,
  },

  btn: {
    alignItems: 'center',
    backgroundColor: 'deepskyblue',
    padding: 10,
    marginTop: 10,
  },
  titulo: {
    color: 'deepskyblue',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    
  }
});
