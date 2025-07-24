package com.kh.app_homework_0724.playlist.api;

import com.kh.app_homework_0724.playlist.service.PlaylistService;
import com.kh.app_homework_0724.playlist.vo.PlaylistVo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/playlists")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

public class PlaylistApiController {

    private final PlaylistService service;

    @PostMapping
    public void createPlaylist(@RequestBody PlaylistVo vo) {
        service.insertPlaylist(vo);
    }

    @PostMapping("/{playlistId}/songs")
    public void addSongToPlaylist(@PathVariable int playlistId, @RequestBody Map<String, Integer> req)  {
        int songId = req.get("songId");
        service.addSongToPlaylist(playlistId, songId);
    }
}
