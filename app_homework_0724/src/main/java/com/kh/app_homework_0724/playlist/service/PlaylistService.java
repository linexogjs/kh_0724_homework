package com.kh.app_homework_0724.playlist.service;

import com.kh.app_homework_0724.playlist.mapper.PlaylistMapper;
import com.kh.app_homework_0724.playlist.vo.PlaylistVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor

public class PlaylistService {

    private final PlaylistMapper mapper;

    public void insertPlaylist(PlaylistVo vo) {
        mapper.insertPlayList(vo);
    }

    public void addSongToPlaylist(int playlistId, int songId) {
        mapper.addSongToPlaylist(playlistId, songId);


    }
}
