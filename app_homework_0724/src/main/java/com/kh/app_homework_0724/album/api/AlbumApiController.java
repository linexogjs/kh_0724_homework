package com.kh.app_homework_0724.album.api;

import com.kh.app_homework_0724.album.service.AlbumService;
import com.kh.app_homework_0724.album.vo.AlbumVo;
import com.kh.app_homework_0724.song.vo.SongVo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/albums")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AlbumApiController {

    private final AlbumService albumService;

    @GetMapping
    public List<AlbumVo> getAllAlbums() {
        return albumService.getAllAlbums();
    }

    @PostMapping
    public void insertAlbum(@RequestBody AlbumVo vo) {
        albumService.insertAlbum(vo);
    }

    @GetMapping("/{albumId}/songs")
    public Map<String, Object> getAlbumWithSongs(@PathVariable int albumId) {
        AlbumVo album = albumService.getAlbumDetails(albumId);
        List<SongVo> songs = albumService.getSongsByAlbum(albumId);
        Map<String, Object> result = new HashMap<>();
        result.put("album", album);
        result.put("songs", songs);
        return result;
    }
}