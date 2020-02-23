var phoneTap = {
    tap: function (dom, callback) {
        if (!dom || typeof dom!='object') {
            return;
        }
        var startTime, startX, startY;
        dom.addEventListener('touchstart', function (e) {
            /* 判断只有一个手指在点击屏幕 */
            if (e.targetTouches.length > 1) {
                return;//多余一个，则不进行任何操作
            }
            /* 记录当前时间 */
            startTime = Date.now();
            /* 记录手指坐标 */
            startX = e.targetTouches[0].clientX;
            startY = e.targetTouches[0].clientY;
        });
        dom.addEventListener('touchend', function(e) {
            if (e.changedTouches.length > 1) {
                return;
            }
            /* 点击时间超过150ms不执行操作 */
            if (Date.now() - startTime > 150) {
                return;
            }
            var endX = e.changedTouches[0].clientX;
            var endY = e.changedTouches[0].clientY;
            /* 如果用户的手指位移小于 6px 则执行回调函数*/
            if (Math.abs(endX - startX) < 6 && Math.abs(endY - startY) < 6) {
                callback && callback(e);
            }
        })
    }
}