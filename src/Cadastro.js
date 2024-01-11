import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Button, Image, Text } from 'react-native';

import ImagePicker from 'react-native-image-picker';

import { useNavigation } from '@react-navigation/native';

import Axios from 'axios';

const Cadastro = () => {


  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [modelo, setModelo] = useState('');
  const [quantidade, setQuantidade] = useState();
  const [img, setImg] = useState('');

  const navigation = useNavigation();

  const saveProduct = () => {

    if (titulo.trim() === "") {
      alert("Titulo não pode estar vazio")
    } else {
      Axios.post('http://10.0.2.2:3000/products', {
        titulo,
        categoria,
        modelo,
        quantidade,
        img
      }).then((res) => {
        alert("Salvo com sucesso!")
        navigation.navigate('Home', { res })
      }).catch(() => alert("Erro ao salvar"))
    }


  }

  useEffect(() => { }, []);


  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      <Image source={{ uri: img ? img : null }} style={{ width: 100, height: 100, borderRadius: 50, borderColor: '#545454', borderWidth: 1 }} />

      <TouchableOpacity onPress={() => ImagePicker.showImagePicker({}, (res) => setImg(res.uri))}>
        <Text>Carregar imagem</Text>
      </TouchableOpacity>

      <TextInput
        value={titulo}
        onChangeText={(txt) => setTitulo(txt)}
        placeholder="Titulo"
        style={{ fontSize: 16, marginTop: 10, borderWidth: 1, width: '100%', height: 50, borderRadius: 10, padding: 7, marginBottom: 10 }}
        placeholderTextColor="#5a5a5a" />


      <TextInput value={categoria} onChangeText={(txt) => setCategoria(txt)} placeholder="Categoria" style={{ fontSize: 16, marginTop: 10, borderWidth: 1, width: '100%', height: 50, padding: 10, borderRadius: 7, marginBottom: 10 }} placeholderTextColor="#5a5a5a" />
      <TextInput value={modelo} onChangeText={(txt) => setModelo(txt)} placeholder="Modelo" style={{ marginBottom: 50, fontSize: 16, marginTop: 10, borderWidth: 1, width: '100%', height: 50, padding: 10, borderRadius: 7 }} placeholderTextColor="#5a5a5a" />
      <TextInput value={quantidade} onChangeText={(txt) => setQuantidade(txt)} placeholder="Quantidade" style={{ marginBottom: 50, fontSize: 16, marginTop: 10, borderWidth: 1, width: '100%', height: 50, padding: 10, borderRadius: 7 }} placeholderTextColor="#5a5a5a" />

      <Button title="Cadastrar" onPress={saveProduct} />

    </View>
  )
}

export default Cadastro;