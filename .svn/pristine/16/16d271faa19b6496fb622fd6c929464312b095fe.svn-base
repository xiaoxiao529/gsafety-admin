import _Storage from '../utils/Storage';
import {
  Alert
} from 'element-ui';

export default function ({
  route
}) {
  if (process.client) {
    const jurisdictionList = _Storage.getObj(
      "jurisdictionList",
      "jurisdictionList"
    )?_Storage.getObj(
      "jurisdictionList",
      "jurisdictionList"
    ):[];
    let currentUrl = route.name;
    let currentBtnArr = [];
    let loopBtn = (list) => {
      for (let i = 0, len = list.length; i < len; i++) {
        const item = list[i];
        if (item.resUrl && item.resUrl === currentUrl) {
          if (item.children && item.children.length > 0) {
            item.children.forEach(element => {
              if (element.resType == 2) {
                currentBtnArr.push({
                  name: element.resName,
                  isShow: true
                })
              }
            });
          }
          console.log(999, currentBtnArr)
          _Storage.setObj("currentBtnArr", "currentBtnArr", currentBtnArr)
          return
        } else {
          if (item.children && item.children.length > 0) {
            loopBtn(item.children)
          }
        }
      }

    }
    loopBtn(jurisdictionList);
  }

}
