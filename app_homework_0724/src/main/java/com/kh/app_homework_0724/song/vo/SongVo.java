package com.kh.app_homework_0724.song.vo;

import lombok.Data;

@Data
public class SongVo {
    private int songId;
    private int albumId;
    private String title;
    private String length;
    private int trackNo;
}
