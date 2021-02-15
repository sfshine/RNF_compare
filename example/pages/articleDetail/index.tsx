import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {view} from '@src/common/redux';
import ArticleListService from './service';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {ArticleItem} from '../articleList';
import {useNavigation, useRoute} from '@react-navigation/native';
import WebView from 'react-native-webview';

export function Page({articleList = [], detailData, error, onLoadData}) {
  const navigation = useNavigation(); //TODO 封装
  const {link, title} = useRoute().params as any;

  useEffect(() => {
    navigation.setOptions({title});
    onLoadData(link);
  }, []);
  return (
    <View>
      <Text>link:{link}</Text>
      <FlatList
        ListHeaderComponent={
          <View style={{overflow: 'hidden', height: 800}}>
            <WebView source={{html: detailData}} />
          </View>
        }
        data={articleList}
        renderItem={({item}) => ArticleItem(item)}
        ItemSeparatorComponent={() => (
          <View style={{height: 1, backgroundColor: 'skyblue'}} />
        )}
        onRefresh={onLoadData}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
export default view(
  (viewState, state) => ({
    detailData: viewState.detailData,
    error: viewState.error,
    articleList: state['ArticleListService'].articleList,
  }),
  (service) => ({
    onLoadData: (link) => service.onLoadData(link), //arrow function or bind(this) needed!
  }),
  ArticleListService,
)(Page);
