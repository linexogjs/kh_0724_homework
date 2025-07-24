package com.kh.app_homework_0724.album.service;

import com.kh.app_homework_0724.album.mapper.AlbumMapper;
import com.kh.app_homework_0724.album.vo.AlbumVo;
import com.kh.app_homework_0724.song.vo.SongVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlbumService {

    private final AlbumMapper albumMapper;

    public List<AlbumVo> getAllAlbums() {
        return albumMapper.getAllAlbums();
    }

    public void insertAlbum(AlbumVo vo) {
        albumMapper.insertAlbum(vo);
    }

    public AlbumVo getAlbumDetails(int albumId) {
        return albumMapper.getAlbumById(albumId);
    }

    public List<SongVo> getSongsByAlbum(int albumId) {
        return albumMapper.getSongsByAlbumId(albumId);
    }
}
