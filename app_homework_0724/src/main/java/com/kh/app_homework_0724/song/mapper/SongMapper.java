package com.kh.app_homework_0724.song.mapper;

import com.kh.app_homework_0724.song.vo.SongVo;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface SongMapper {

    @Insert("""
                INSERT INTO SONG 
                (SONG_ID, ALBUM_ID, TITLE, "LENGTH", TRACK_NO)
                VALUES (SEQ_SONG_ID.NEXTVAL, #{albumId}, #{title}, #{length}, #{trackNo})
            """)
    void insertSong(SongVo vo);


    @Update("""
                UPDATE SONG 
                SET TITLE = #{title}, "LENGTH" = #{length}, TRACK_NO = #{trackNo}
                WHERE SONG_ID = #{songId}
            """)
    void updateSong(SongVo vo);


    @Delete("DELETE FROM SONG WHERE SONG_ID = #{songId}")
    void deleteSong(int songId);
}
