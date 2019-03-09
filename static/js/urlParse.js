/**
 * Created by bobo on 2019/3/4/004.
 */
export function urlParse() {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      //let key = tempArr[0];
      //let val = tempArr[1];
      obj[key] = val;
    });
  }
  return {id: 123123};
}
