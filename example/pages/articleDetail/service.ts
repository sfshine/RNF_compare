import {ReService} from '@src/common/redux';

export default class DetailService extends ReService {
  private pageIdentifier = 'DetailService#' + new Date().getTime();

  onLoadData = (link) => {
    fetch(link)
      .then((result) => result.text())
      .then((text) => {
        this.dispatch({
          detailData: text,
        });
      })
      .catch((error) => {
        this.dispatch({error: error.message});
      });
  };
  getPageIdentifier(): any {
    return this.pageIdentifier;
  }
}
