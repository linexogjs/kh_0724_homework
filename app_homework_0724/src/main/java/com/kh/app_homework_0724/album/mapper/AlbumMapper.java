package com.kh.app_homework_0724.album.mapper;

import com.kh.app_homework_0724.album.vo.AlbumVo;
import com.kh.app_homework_0724.song.vo.SongVo;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AlbumMapper {

    @Select("SELECT * FROM ALBUM ORDER BY ALBUM_ID DESC")
    List<AlbumVo> getAllAlbums();

    @Insert("""
        INSERT INTO ALBUM (ALBUM_ID, TITLE, ARTIST, RELEASE_DATE, GENRE, COVER_IMAGE_URL)
        VALUES (SEQ_ALBUM_ID.NEXTVAL, #{title}, #{artist}, TO_DATE(#{releaseDate}, 'YYYY-MM-DD'), #{genre}, #{coverImageUrl})
    """)
    void insertAlbum(AlbumVo vo);

    @Select("SELECT * FROM ALBUM WHERE ALBUM_ID = #{albumId}")
    AlbumVo getAlbumById(int albumId);

    @Select("SELECT * FROM SONG WHERE ALBUM_ID = #{albumId} ORDER BY TRACK_NO ASC")
    List<SongVo> getSongsByAlbumId(int albumId);
}
