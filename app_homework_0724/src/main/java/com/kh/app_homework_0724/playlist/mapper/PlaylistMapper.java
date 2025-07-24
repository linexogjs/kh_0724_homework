package com.kh.app_homework_0724.playlist.mapper;

import com.kh.app_homework_0724.playlist.vo.PlaylistVo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Mapper
public interface PlaylistMapper {

    @Insert("""
            INSERT INTO PLAYLIST (
              PLAYLIST_ID, NAME
            ) VALUES (
              SEQ_PLAYLIST_ID.NEXTVAL, #{name}
            )
            """)
    void insertPlayList(PlaylistVo vo);


    @Insert("""
            INSERT INTO 
            PLAYLIST_SONG (PLAYLIST_ID, SONG_ID) 
            VALUES (#{playlistId}, #{songId})
            """)
    void addSongToPlaylist(@Param("playlistId") int playlistId, @Param("songId") int songId);
}
