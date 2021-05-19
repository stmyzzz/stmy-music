import { getArtists,numDate } from "./commen"
import {getAlbumImg} from '@/api'
export function createSong(song){ 
    /* 解构 */
    const {id,name,img,artists,duration,albumId,albumName,mvId,...rest} = song
    return {
      id,
      name,
      img,
      artists,
      duration,
      albumName,
      url:songPlayerUrl(id),
      artistsText:getArtists(artists),
      durationSecond:numDate(duration/1000),
      albumId,
      mvId,
      ...rest
    }
  }

export function songPlayerUrl(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

export async function getImgUrl (id,albumId) {
  const {songs} = await getAlbumImg(albumId)
  const {al:{picUrl}} = songs.find(({id:songId}) => songId === id ) || {}
  return picUrl
}

 /* [01:17.930] 1分17秒.930 */
export function getLysic(time){
  const regMin = /.*:/
  const regSec = /:.*\./
  const regMs = /\..*/
  const min = parseInt(time[0].match(regMin)[0].slice(1,3) )
  const sec = parseInt(time[0].match(regSec)[0].slice(1,3))
  const ms = Number(time[0].match(regMs)[0].slice(1,4))
  return min*60000 + sec*1000 + ms;
}
