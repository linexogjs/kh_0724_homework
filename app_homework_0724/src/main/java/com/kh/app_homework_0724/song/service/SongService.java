package com.kh.app_homework_0724.song.service;

import com.kh.app_homework_0724.song.mapper.SongMapper;
import com.kh.app_homework_0724.song.vo.SongVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SongService {

    private final SongMapper songMapper;

    public void insertSong(SongVo vo) {
        songMapper.insertSong(vo);
    }

    public void updateSong(SongVo vo) {
        songMapper.updateSong(vo);
    }

    public void deleteSong(int songId) {
        songMapper.deleteSong(songId);
    }
}
