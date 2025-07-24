package com.kh.app_homework_0724.album.vo;

import lombok.Data;

@Data
public class AlbumVo {
    private int albumId;
    private String title;
    private String artist;
    private String releaseDate;
    private String genre;
    private String coverImageUrl;
}
