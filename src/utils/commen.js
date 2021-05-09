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