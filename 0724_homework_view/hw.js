const url = 'http://localhost:8080/api';
let albumList = [];
let selectedAlbumId = null;
let editingSongId = null;

// 앨범 등록
function createAlbum() {
  const title = document.getElementById('albumName').value.trim();
  const releaseDate = document.getElementById('releaseDate').value.trim();
  const coverImageUrl = document.getElementById('coverImageUrl').value.trim();

  if (!title || !releaseDate || !coverImageUrl) {
        Swal.fire({
      icon: "error",
      title: "등록 실패...",
      text: "모든 입력값을 채워주세요!",
    });
    return;
  }

  fetch(`${url}/albums`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      { title, releaseDate, coverImageUrl }
    )
  })
    .then(res => {
      if (res.ok) {
                Swal.fire({
          title: "등록 성공!",
          icon: "success",
          draggable: true
        });
        document.getElementById('albumName').value = '';
        document.getElementById('releaseDate').value = '';
        document.getElementById('coverImageUrl').value = '';
        document.getElementById('coverPreview').innerHTML = '';
        loadAlbums();
      } else {
        Swal.fire({
          icon: "error",
          title : "등록실패..",
          text : "서버 오류로 인해 실패하였습니다.",
        });
      }
    });
}

function previewCover() {
  const url = document.getElementById('coverImageUrl').value.trim();
  document.getElementById('coverPreview').innerHTML = url ? `<img src="${url}" width="200">` : '';
}

// 앨범 목록 불러오기
function loadAlbums() {
  fetch(`${url}/albums`)
    .then(res => res.json())
    .then(data => {
      albumList = data;
      const select = document.getElementById('albumSelect');
      select.innerHTML = '<option value="">앨범 선택</option>';
      data.forEach(album => {
        const option = document.createElement('option');
        const dateOnly = album.releaseDate?.split(' ')[0];
        option.value = album.albumId;
        option.textContent = `${album.title} (${dateOnly})`;
        select.appendChild(option);
      });
    });
}

// 앨범 상세 + 곡 목록
function loadAlbumDetails() {
  const albumId = parseInt(document.getElementById('albumSelect').value);
  if (isNaN(albumId)) return;
  selectedAlbumId = albumId;

  fetch(`${url}/albums/${albumId}/songs`)
    .then(res => res.json())
    .then(data => {
      const album = data.album;
      const songs = data.songs;

      document.getElementById('albumTitle').textContent = album.title;
      document.getElementById('albumDate').textContent = album.releaseDate.split(' ')[0];
      document.getElementById('albumImage').src = album.coverImageUrl;

      const ul = document.getElementById('songList');
      ul.innerHTML = '';
      if (songs.length === 0) {
        ul.innerHTML = '<li>수록곡이 없습니다.</li>';
        return;
      }

      songs.forEach(song => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${song.trackNo}. ${song.title} (${song.length})
          <button onclick="editSong(${song.songId}, '${song.title}', '${song.length}', ${song.trackNo})">수정</button>
          <button onclick="deleteSong(${song.songId})">삭제</button>
        `;
        ul.appendChild(li);
      });
    });
}

// 곡 등록 (or 수정)
function addSong() {
  if (!selectedAlbumId) {
    Swal.fire({
      icon: "error",
      title: "등록 실패...",
      text: "먼저 앨범을 선택해주세요!",
    });
    return;
  }

  const title = document.getElementById('songTitle').value.trim();
  const length = document.getElementById('songLength').value.trim();
  const trackNo = parseInt(document.getElementById('trackNo').value);

  if (!title || !length || isNaN(trackNo)) {
    Swal.fire({
      icon: "error",
      title: "등록 실패...",
      text: "모든 입력값을 채워주세요!",
    });
    return;
  }

  const payload = {
    albumId: selectedAlbumId,
    title,
    length,
    trackNo
  };

  if (editingSongId === null) {
    // 신규 등록
    fetch(`${url}/songs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(res => {
      if (res.ok) {
        Swal.fire({
          title: "곡 등록 성공!",
          icon: "success",
          draggable: true
        });
        resetSongForm();
        loadAlbumDetails();
      } else {
            Swal.fire({
          icon: "error",
          title: "곡 등록 실패...",
          text: "다시 한 번 확인해주세요!",
        });
      }
    });
  } else {
    // 수정
    fetch(`${url}/songs/${editingSongId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(res => {
      if (res.ok) {
              Swal.fire({
        position: "center",
        icon: "success",
        title: "곡 수정 완료!",
        showConfirmButton: false,
        timer: 1500
      });
        resetSongForm();
        loadAlbumDetails();
      } else {
        alert('곡 수정 실패');
      }
    });
  }
}

// 수정 모드 진입
function editSong(songId, title, length, trackNo) {
  editingSongId = songId;
  document.getElementById('songTitle').value = title;
  document.getElementById('songLength').value = length;
  document.getElementById('trackNo').value = trackNo;

  document.getElementById('songFormTitle').textContent = '곡 수정';
  document.getElementById('songSubmitBtn').textContent = '수정';
  document.getElementById('cancelEditBtn').style.display = 'inline';
}

// 수정 취소
function resetSongForm() {
  editingSongId = null;
  document.getElementById('songTitle').value = '';
  document.getElementById('songLength').value = '';
  document.getElementById('trackNo').value = '';
  document.getElementById('songFormTitle').textContent = '곡 등록';
  document.getElementById('songSubmitBtn').textContent = '등록';
  document.getElementById('cancelEditBtn').style.display = 'none';
}

// 삭제
function deleteSong(songId) {
  Swal.fire({
    title: "정말 삭제하시겠습니까?",
    text: "삭제 후 복구할 수 없습니다!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "네, 삭제하겠습니다.",
    cancelButtonText: "취소"
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`${url}/songs/${songId}`, {
        method: 'DELETE'
      })
      .then(res => {
        if (res.ok) {
          Swal.fire({
            title: "삭제 완료!",
            text: "수록곡이 삭제되었습니다.",
            icon: "success",
            confirmButtonText: "확인"
          }).then(() => {
            loadAlbumDetails();  
          });
        } else {
          Swal.fire({
            title: "삭제 실패",
            text: "서버와의 통신에 실패했습니다.",
            icon: "error"
          });
        }
      });
    }
  });
}


window.onload = loadAlbums;
