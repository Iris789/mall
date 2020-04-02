require('../css/goodsInfo.less');
require('./goodsCover.js');

function getId() {
    var params = location.search.slice(1).split('&'),
        len = params.length;
    for (var i = 0; i < len; i++){
        if (params[i].indexOf('id=') !== -1) {
            return params[i].slice(3);
        }
    }
}
function getGoodsInfo() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/goodsList.json',
        success: function (data) {
            showInfo(data);//这里实际是将id作为参数传到后台 获取对应数据渲染即可 这里没有写好的后台数据 故还是请求所有再筛选该id的
        }
    });
}
getGoodsInfo();
function showInfo(json) {
    var list = json.list,
        len = list.length,
        currId = getId(),
        imgStr = '',
        liStr = '';
    for (var i = 0; i < len; i++){
        if (list[i].id == currId) {
            $('.infor_one_img').html($('<img src="' + list[i].imgurl[0] + '" />'));
            $('.one_name').html(list[i].name);

            //取价格最小值和最大值
            list[i].spectList.sort(sortPrice('price'));
            var priceRange = '¥' + list[i].spectList[0].price + '-' + list[i].spectList[list[i].spectList.length - 1].price;
            $('.one_price').html(priceRange);
            $('.price_value').html(priceRange);

            list[i].imgurl.forEach(function (ele) {
                imgStr += '<img src="' + ele + '" />';
            });
            $('.infor_th').append($(imgStr));

            list[i].spectList.forEach(function (ele) {
                if (ele.quantity < 1) {
                    liStr += '<li class="buy_spect_li" data-price="'+ ele.price +'" data-quantity="'+ele.quantity+'" style="background-color:#ccc;color:#999;pointer-events:none">'+ ele.spect +'</li>';
                } else {
                    liStr += '<li class="buy_spect_li" data-price="'+ ele.price +'" data-quantity="'+ele.quantity+'">'+ ele.spect +'</li>';
                }
            });
            $('.buy_spect_wrap ul').html(liStr);
        }
    }
}
function sortPrice(prop) {
    return function (a, b) {
        return a[prop] - b[prop];
    }
}
function bindEvent() {
    $('.infor_two').on('click', function () {
        $('.buy_wrap').css({ 'display': 'block' });
        $('html').css({ 'height': '100%', 'overflow': 'hidden' });
    });

    $('.buy_gray').on('click', function () {
        $('.buy_wrap').css({ 'display': 'none' });
        $('html').css({ 'height': '100%', 'overflow': 'visible' });
    });

    $('.infor_fo').on('click', function () {
        $('.buy_wrap').css({ 'display': 'block'});
    });
}
bindEvent();