
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const elem = $('.header__search-input')
const btnSearch = $('.header__search-btn')
const navbarItems = $$('.navbar__item')
const playListIcon = $('.js-player__controls-list')
const list = $('.js-player__controls-playlist')
const gallery = $('.js-maincontent__gallery')
const galleryList = $('.js-maincontent__gallery-list')
const arrowIcons = $$('.js-gallery__icon')
const songName = $('.player__info-name')
const singerName = $('.player__info-singer')
const songImage = $('.player__info-img')
const firstImg = galleryList.querySelectorAll(".js-maincontent__gallery-link")[0]
const playBtn = $('.btn-play')
const audio = $('#audio')
const player = $('.player')
const inputRange = $('.player__controls-input')
const backBtn = $('.btn-back')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.player__playlist-body')

console.log(songName, singerName, audio)
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: 'Đế Vương',
            singer: 'Nhật Phong',
            path: './assets/audio/DeVuong.mp3',
            image: '/assets/img/image_81.webp'
        },
        {
            name: 'Cô Đơn',
            singer: 'Hngle, Niz, Ari',
            path: './assets/audio/CoDon.mp3',
            image: '/assets/img/image_82.webp'
        },
        {
            name: 'Có Hẹn Với Thanh Xuân',
            singer: 'Monstar',
            path: './assets/audio/CoHenVoiThanhXuan.mp3',
            image: '/assets/img/image_83.webp'
        },
        {
            name: 'Đâu Ai Dám Hứa',
            singer: 'Czee',
            path: './assets/audio/DauAiDamHua.mp3',
            image: '/assets/img/image_84.webp'
        },
        {
            name: 'En Đồng Ý',
            singer: 'Đức Phúc',
            path: './assets/audio/EmDongY.mp3',
            image: '/assets/img/image_85.webp'
        },
        {
            name: 'Em là',
            singer: 'MoNo',
            path: './assets/audio/EmLa.mp3',
            image: '/assets/img/image_86.webp'
        },
        {
            name: 'Rồi Ta Sẽ Ngắm Pháo Hoa Cùng Nhau',
            singer: 'O.lew',
            path: './assets/audio/RoiTaSeNgam.mp3',
            image: '/assets/img/image_87.webp'
        },
        {
            name: 'See Tình',
            singer: 'Hoàng Thùy Linh',
            path: './assets/audio/SeeTinh.mp3',
            image: '/assets/img/image_88.webp'
        },
        {
            name: 'Tình Ka Ngọt Ngào',
            singer: 'Lập Nguyên',
            path: './assets/audio/TinhKaNgotNgao.mp3',
            image: '/assets/img/image_89.webp'
        },
        {
            name: 'Vì Mẹ Anh Bắt Chia Tay',
            singer: 'Miu Lê, Karik',
            path: './assets/audio/ViMeAnhBatChiaTay.mp3',
            image: '/assets/img/image_90.webp'
        },
        {
            name: 'Waiting For You',
            singer: 'MoNo',
            path: './assets/audio/WaitingForYou.mp3',
            image: '/assets/img/image_91.webp'
        }
    ],

    render:function() {
        const htmls = this.songs.map((song, index) => {
            return `
                <li class="player__playlist-item ${index === this.currentIndex ? 'player__item-active' : ''}" data-index='${index}'>
                    <div class="player__playlist-item-body">
                        <div class="player__playlist-item-img">
                            <img src="${song.image}" alt="">
                            <div class="player__playlist-item-icon">
                                <i class="fa-solid fa-play"></i>
                            </div>
                        </div>
                        <div class="player__playlist-item-desc">
                            <span class="player__playlist-item-name">${song.name}</span>
                            <span class="player__playlist-item-singer">${song.singer}</span>
                        </div>
                    </div>

                    <div class="player__playlist-item-more">
                        <i class="fa-solid fa-ellipsis"></i>
                    </div>
                </li>
            `
        })

        playlist.innerHTML = htmls.join('')
    },
    handleEvents: function() {
        // xu ly truot header
        arrowIcons.forEach(icon => {
            icon.addEventListener("click", () => {
                galleryList.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth
            })
        })

        // dong mo playlist
        playListIcon.onclick = function() {
            if (list.style.left === '270px') {
                list.style.left = '-68px'
                playListIcon.style.backgroundColor = '#9b4ddf'
            } else {
                list.style.left = '270px'
                playListIcon.style.backgroundColor = '#2b2533'
            }
        }

        // xu ly khi click nut play
        playBtn.onclick = function() {
            if(app.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }  
        }

        // Khi bai hat chay
        audio.onplay = function() {
            app.isPlaying = true
            player.classList.add('playing')
        }

        // khi bai hat dung lai
        audio.onpause = function() {
            app.isPlaying = false
            player.classList.remove('playing')
        }

        // khi tien do bai hat thay doi
        audio.ontimeupdate = function() {
            const inputPercent = Math.floor(audio.currentTime / audio.duration * 100)
            inputRange.value = inputPercent
        
        }

        // xu ly khi tua bai hat
        inputRange.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        // xu ly khi prev bai hat
        backBtn.onclick = function() {
            if(!app.isRandom) {
                app.prevSong()
            } else {
                app.randomSong()
            }
            audio.play()
            app.render()
            app.scrollActiveView()
        }

        // xu ly khi next bai hat
        nextBtn.onclick = function() {
            if(!app.isRandom) {
                app.nextSong()
            } else {
                app.randomSong()
            }
            audio.play()
            app.render()
            app.scrollActiveView()
        }

        // xu ly khi click random
        randomBtn.onclick = function() {
            app.isRandom = !app.isRandom
            randomBtn.classList.toggle('active-btn', app.isRandom)
        }

        // xu ly lap lai bai hat repeat
        repeatBtn.onclick = function() {
            app.isRepeat = !app.isRepeat
            repeatBtn.classList.toggle('active-btn', app.isRepeat)
        }

        // xu ly tu dong next bai hat khi bai hat hien tai het
        audio.onended = function() {
            if(app.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        playlist.onclick = function(e) {
            const songNode = e.target.closest('.player__playlist-item:not(.player__item-active)')
            if (songNode || e.target.closest('.player__playlist-item-more')) {
                if (songNode) {
                    app.currentIndex = Number(songNode.dataset.index)
                    app.loadCurrentSong()
                    app.render()
                    audio.play()
                }
            }
        }
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    scrollActiveView: function () {
        setTimeout(() => {
            $('.player__playlist-item.player__item-active').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }, 300)
    },
    loadCurrentSong: function() {
        songName.textContent = this.currentSong.name
        singerName.textContent = this.currentSong.singer
        songImage.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
        
    },
    nextSong: function() {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIndex--
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length
        }
        this.loadCurrentSong()
    },
    randomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while(newIndex == this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    start: function() {
        // dinh nghia cac thuoc tinh cho object
        this.defineProperties()

        // lang nghe xu ly cac su kien (DOM event)
        this.handleEvents()

        // tai thong tin bai hat dau tien vao UI khi chay ung dung
        this.loadCurrentSong()

        // render playlist
        this.render()
    }
}

app.start()

let firstImgWidth = firstImg.clientWidth + 28

setInterval('checkFocus()', 2)
function checkFocus() {
    if (elem === document.activeElement) {
        btnSearch.style.borderBottomLeftRadius = 0
        btnSearch.style.backgroundColor = '#34234f'
        
    } else {

        btnSearch.style.borderBottomLeftRadius = '20px'
        btnSearch.style.backgroundColor = '#2f2639'
        
    }
}






