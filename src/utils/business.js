import { getArtists } from "./commen"

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
      durationSecond:duration/1000,
      albumId,
      mvId,
      ...rest
    }
  }

export function songPlayerUrl(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}