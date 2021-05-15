export {debounce} from 'lodash-es'

/* export {getartistText} */

export function getArtists(artists){ 
    return (artists || []).map(item =>item.name).join('/')
  }

export function setImg(url,w,h){
  if(!h){
    h = w
  }
  url += `?params=${w}y${h}`
  return url
}

export function zero(num) { 
    let len = num.toString().length
    if(len<2){
      num = "0"+num;
    }
    return num;
  }

  export function formatDate (date, fmt = 'yyyy-MM-dd hh:mm:ss') {
    date = date instanceof Date ? date : new Date(date)
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? str : padLeftZero(str)
        )
      }
    }
    return fmt
  }
  function padLeftZero (str) {
    return ('00' + str).substr(str.length)
  }

export function numDate(date){ 
    //329
    const min =zero(parseInt(date/60)) 
    const sec = zero(parseInt(date%60))
    return `${min}:${sec}`
  }

export function numPerson(personNum) { 
  if(personNum>100000){
    return parseInt((personNum / 10000)) +'万'
  }else{
    return personNum
  }
}

export function getPageOffset(page,limit) { 
    return (page - 1) * limit
  }