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
    alert('모든 값을 입력해주세요');
    return;
  }

  fetch(`${url}/albums`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, releaseDate, coverImageUrl })
  })
    .then(res => {
      if (res.ok) {
        alert('앨범 등록 완료');
        document.getElementById('albumName').value = '';
        document.getElementById('releaseDate').value = '';
        document.getElementById('coverImageUrl').value = '';
        document.getElementById('coverPreview').innerHTML = '';
        loadAlbums();
      } else {
        alert('등록 실패');
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
        ul.innerHTML = '<li>수록곡 없음</li>';
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
    alert('먼저 앨범을 선택해주세요.');
    return;
  }

  const title = document.getElementById('songTitle').value.trim();
  const length = document.getElementById('songLength').value.trim();
  const trackNo = parseInt(document.getElementById('trackNo').value);

  if (!title || !length || isNaN(trackNo)) {
    alert('곡명, 길이, 트랙번호를 모두 입력해주세요.');
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
        alert('곡 등록 완료');
        resetSongForm();
        loadAlbumDetails();
      } else {
        alert('곡 등록 실패');
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
        alert('곡 수정 완료');
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
  if (!confirm('정말 삭제하시겠습니까?')) return;

  fetch(`${url}/songs/${songId}`, {
    method: 'DELETE'
  }).then(res => {
    if (res.ok) {
      alert('삭제 완료');
      loadAlbumDetails();
    } else {
      alert('삭제 실패');
    }
  });
}

window.onload = loadAlbums;
