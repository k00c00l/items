window.onload = function () {
    /* 获取左侧类目 */
    var left = document.querySelector('.left');
    /* 左侧栏的高度 */
    var leftHeight = left.offsetHeight;
    /* 获取产生滑动的列表 */
    var ulBox = document.querySelector('ul:first-of-type');
    /* ul的高度 */
    var ulBoxHeight = ulBox.offsetHeight;
    /* 设置静止状态下的最大top值 */
    var maxTop = 0;
    /* 设置静止状态下的最小top值 */
    var minTop = leftHeight - ulBoxHeight;
    /* 设置滑动状态下最大top */
    var maxBounceTop = maxTop + 100;
    /* 设置滑动状态下最小top */
    var minBounceTop = minTop - 100;

    /* 实现滑动 */
    var currentY,startY, moveY, distanceY;
    currentY = 0;
    startY = 0;
    moveY = 0;
    distanceY = 0;
    ulBox.addEventListener('touchstart', function (e) {
        startY = e.targetTouches[0].clientY;
    });
    ulBox.addEventListener('touchmove', function (e) {
        moveY = e.targetTouches[0].clientY;
        /* 计算滑动的距离 */
        distanceY = moveY - startY;
        if (currentY + distanceY > maxBounceTop || currentY + distanceY < minBounceTop) {
            return;
        }
        ulBox.style.transition = 'none';
        ulBox.style.top = (currentY + distanceY) + 'px';
    });
    ulBox.addEventListener('touchend', function () {
        if (currentY + distanceY < minTop) {
            currentY = minTop;
            ulBox.style.transition = 'top 0.5s';
            ulBox.style.top = minTop + 'px';
        } else if (currentY + distanceY > maxTop) {
            currentY = maxTop;
            ulBox.style.transition = 'top 0.5s';
            ulBox.style.top = maxTop + 'px';
        } else {
            /* 记录当前累计滑动的距离 */
        currentY+=distanceY;
        }
    });
    phoneTap.tap(ulBox, function (e) {
        /* 清除所有样式 */
        for (var i = 0; i < ulBox.children.length; i++) {
            ulBox.children[i].classList.remove('active');
        }
        /* 为当前点击的元素添加样式 */
        var li = e.target.parentNode;
        li.classList.add('active');
    }); 
}