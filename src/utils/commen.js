export {debounce} from 'lodash-es'

/* export {getartistText} */

export function getArtistText(artists){
  return (artists || []).map(item => item.name).join('/');
}
