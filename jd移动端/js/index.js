/* 顶部搜索栏的滑动透明特效 */
var search = document.getElementById('search');
var banners = document.getElementById('banners');
var banners_height = banners.offsetHeight;
window.onscroll = function () {
    var offsetTop = document.documentElement.scrollTop || document.body.scrollTop;//存在兼容性
    var opacity = offsetTop/banners_height;

    if (offsetTop < banners_height) {
        opacity = offsetTop / banners_height;
    } else {
        opacity = 1;//解决瞬移产生的bug
    }
    search.style.backgroundColor = 'rgba(233, 35, 34,' + opacity + ')';//注意此处字符串的拼接
}

/* 倒计时 */
var timer = document.getElementById('timer');
var spans = timer.children;
var time = 1*60*60;
var timerId=setInterval(function () {
    time--;
    if (time < 0) {
        clearInterval(timerId);
    }
    var hour = parseInt(time/60/60);
    var minute = parseInt(time%3600/60);
    var second = parseInt(time%60);
    spans[0].innerHTML = parseInt(hour/10);
    spans[1].innerHTML = parseInt(hour%10);
    spans[3].innerHTML = parseInt(minute/10);
    spans[4].innerHTML = parseInt(minute%10);
    spans[6].innerHTML = parseInt(second/10);
    spans[7].innerHTML = parseInt(second%10);
    
}, 1000);

/* 动态修改轮播图结构 */
/* 实现思路，在原始图组的前面和尾部分别克隆最后一张图和第一张图
由于需要日后维护方便，选择动态修改页面结构， */
var imgBox = document.getElementById('imgBox');//轮播图中ul
var first = imgBox.children[0];//第一张图
var length = imgBox.children.length;//li标签数量
var last = imgBox.children[length - 1];//最后一张图
imgBox.appendChild(first.cloneNode(true));//向尾部添加第一张图
imgBox.insertBefore(last.cloneNode(true),imgBox.children[0]);//向头部添加最后一张图

var screenWidth = banners.offsetWidth;//获取窗口大小
var lis = imgBox.getElementsByTagName('li');
var count = lis.length;
imgBox.style.width = count*screenWidth + 'px';//修改ul大小
for (var i = 0; i < count; i++) {//循环修改li的宽度
    lis[i].style.width = screenWidth + 'px';
}
imgBox.style.left = -screenWidth + 'px';
/* 为图片设置索引 */
var index = 1;
//屏幕发生变化，重新获取屏幕宽度，以达到自适应的效果
window.onresize = function () {
    screenWidth = banners.offsetWidth;//重新获取窗口大小
    var lis = imgBox.getElementsByTagName('li');
    var count = lis.length;
    imgBox.style.width = count * screenWidth + 'px';//修改ul大小
    for (var i = 0; i < count; i++) {//循环修改li的宽度
        lis[i].style.width = screenWidth + 'px';
    }
    imgBox.style.left = (-screenWidth * index) + 'px';
}
/* 点标记 */
function setPoints(index) {
    var points = document.getElementById('points').children;
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        point.classList.remove('active');
    }
    points[index].classList.add('active');
}
/* 设置自动轮播 */
var timerId;
function autoPlay() {
    timerId = setInterval(function () {
        /* 改变索引值大小 */
        index++;
        /* 添加过渡效果 */
        imgBox.style.transition = 'left 0.5s ease-in-out';
        /* 设置偏移量 */
        imgBox.style.left = (-index * screenWidth) + 'px';
        /* 设置延迟执行函数 */
        setTimeout(function () {
            if (index == count - 1) {
                index = 1;
                imgBox.style.transition = 'none';
                imgBox.style.left = (-index * screenWidth) + 'px';
            }
        }, 500);
    }, 3000);
}
autoPlay();
/* 设置手动轮播 */
var  startX, moveX, distanceX;
/* 添加触摸开始事件 */
imgBox.addEventListener('touchstart', function (e) {
    clearInterval(timerId);
    startX = e.targetTouches[0].clientX;
});
/* 添加触摸滑动事件 */
imgBox.addEventListener('touchmove', function (e) {
    moveX = e.targetTouches[0].clientX;
    /* 计算水平位移差 */
    distanceX = moveX - startX;
    /* 消除过渡效果 */
    imgBox.style.transition = 'none';
    /* 重新定位ul */
    imgBox.style.left = (- index * screenWidth + distanceX) + 'px';
});
/* 添加触摸结束事件 */
imgBox.addEventListener('touchend', function() {
    /* 取绝对值保证用户希望产生滑动 */
    if (Math.abs(distanceX) > 70) {
        if (distanceX > 0) {//上一张
            index--;
        } else {//下一张
            index++;
        }
        imgBox.style.transition = 'left 0.5s ease-in-out';
        imgBox.style.left = (-index * screenWidth) + 'px';
    } else if (Math.abs(distanceX) <= 70) {
        imgBox.style.transition = 'left 0.5s ease-in-out';
        imgBox.style.left = (-index * screenWidth) + 'px';
    }
    /* 再次开启计时器 */
    autoPlay();
});
/* 过渡监听事件 */
imgBox.addEventListener('webkitTransitionEnd', function () {
    if (index == count - 1) {
        index = 1;
        imgBox.style.transition = 'none';
        imgBox.style.left = (-index * screenWidth) + 'px';
    } else if (index == 0) {
        index = count - 2;
        imgBox.style.transition = 'none';
        imgBox.style.left = (-index * screenWidth) + 'px';
    }
    setPoints(index - 1);
})