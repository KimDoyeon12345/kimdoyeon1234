let scrollY = 0;
let wrap = null;

// 스크린 높이 계산
function syncHeight() {
    document.documentElement.style.setProperty(
        '--window-inner-height',
        `${window.innerHeight}px`
    );
}

// body scroll lock
function bodyLock() {
    scrollY = window.scrollY;
    document.documentElement.classList.add('is-locked');
    if (wrap) wrap.style.top = `-${scrollY}px`;
}

// body scroll unlock
function bodyUnlock() {
    document.documentElement.classList.remove('is-locked');
    if (wrap) wrap.style.top = '';
    window.scrollTo(0, scrollY);
}

// tab menu
function tabMenuEvent() {
    $('.tabMenu li').off('click').on('click', function () {
        const tabId = $(this).data('tab');
        const $wrap = $(this).closest('.tabWrap');

        $wrap.find('.tabMenu li').removeClass('active');
        $(this).addClass('active');

        $wrap.find('.tabPanel').removeClass('active');
        $('#' + tabId).addClass('active');
    });
}

// popup
function modalOpen(id) {
    $('#' + id).fadeIn('fast');
    $('#dim').fadeIn('fast');
    bodyLock();
    tabMenuEvent();
}

function modalClose(el) {
    $(el).closest('.popWrap').fadeOut('fast');
    $('#dim').fadeOut('fast');
    bodyUnlock();
}

function headerActiveCheck() {
    const TopVal = $(window).scrollTop();
    const TopFixed1 = 100;

    if (TopFixed1 <= TopVal) {
        $('#header').addClass('active');
    } else {
        $('#header').removeClass('active');
    }
}
$(window).on('scroll', headerActiveCheck);
// 새로고침
$(document).ready(() => {
    headerActiveCheck();
});


/* ------------------------------
   window 이벤트
--------------------------------*/

window.addEventListener('resize', syncHeight);
