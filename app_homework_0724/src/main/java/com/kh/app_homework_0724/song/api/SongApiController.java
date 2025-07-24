package com.kh.app_homework_0724.song.api;

import com.kh.app_homework_0724.song.service.SongService;
import com.kh.app_homework_0724.song.vo.SongVo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/songs")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SongApiController {

    private final SongService songService;

    @PostMapping
    public void insertSong(@RequestBody SongVo vo) {
        songService.insertSong(vo);
    }

    @PutMapping("/{songId}")
    public void updateSong(@PathVariable int songId, @RequestBody SongVo vo) {
        vo.setSongId(songId);
        songService.updateSong(vo);
    }

    @DeleteMapping("/{songId}")
    public void deleteSong(@PathVariable int songId) {
        songService.deleteSong(songId);
    }
}
