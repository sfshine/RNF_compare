import {get} from '@src/common/network';
import {ReService} from '@src/common/redux';

export default class ArticleListService extends ReService {
  onLoadData = () => {
    this.dispatch({refreshing: true});
    this.dispatch({
      refreshing: false,
      articleList: '111',
      error: null,
    });
    get('https://wanandroid.com/wxarticle/list/408/1/json')
      .then((result) => {
        this.dispatch({
          refreshing: false,
          articleList: result?.data?.datas,
          error: null,
        });
      })
      .catch((error) => {
        this.dispatch({refreshing: false, error: error.message});
      });
  };
}
