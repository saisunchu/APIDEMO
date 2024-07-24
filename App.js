import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const App = () => {
  const [dataSource, setDataSource] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(0);

  const renderItem = ({item}) => {
    return (
      <View style={styles.renderItemContainor}>
        {/* <Text>This is renderItem</Text> */}
        <Image
          source={{uri: item.thumbnail}}
          height={150}
          width={250}
          resizeMode="contain"
        />

        <View style={styles.titlepriceView}>
          <Text style={styles.PriceText}>{item.title}</Text>
          <Text style={styles.PriceText}>{item.price}</Text>
        </View>
      </View>
    );
  };

  const FetchAPIFn = async () => {
    let response = await fetch(
      `https://dummyjson.com/products?limit=${itemsPerPage}`,
    );
    let responsejson = await response.json();
    setItemsPerPage(itemsPerPage + 10);
    setDataSource(responsejson.products);

    console.log('In FetchAPIFn, ', responsejson.products);
  };

  useEffect(() => {
    FetchAPIFn();
    console.log('In UseEffect - ', dataSource);
  }, []);

  return (
    <View style={styles.mainContainor}>
      {/* <Text>HEllo World</Text> */}
      <FlatList
        data={dataSource}
        key={(item, index) => index.toString()}
        renderItem={renderItem}
        onEndReached={FetchAPIFn}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  mainContainor: {
    flex: 1,
    alignItems: 'center',
  },
  renderItemContainor: {
    width: 310,
    // height: 100,
    marginVertical: 10,
    borderWidth: 1,
    marginHorizontal: 20,
    marginRight: 20,
    padding: 10,
  },
  titlepriceView: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  PriceText: {
    fontWeight: 'bold',
  },
});
