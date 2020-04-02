require('../css/index.less');
/*
总的思路： 
    1、当然js是通过babel-loader来打包的 是入口文件 可通过require()引入less js均可
        只需在对应页面中引入打包输出后的路径即可
       主js文件中可引入该页面的一些小组件js
       主js文件引入该页面的主less文件
    2、样式是通过less实现的 故要通过less-loader解析less
        对应的less文件在对应页面js中通过require()引入
       当然每一个less文件可通过@import引入其它基本样式less文件
（1主js——>1主less——>多个基本less）
（1主js——>多个页面小组件js——>1主less）
index.html -->index.js -->index.less
goodsInfo.html -->goodsInfo.js -->goodsInfo.less 
                               -->goodsCover.js
                                  goodsCover.js -->goodsCover.less

index.less -->base.less
goodsInfo.less -->base.less
goodsCover.less -->base.less

该项目两个重点：
商品详细页面 点选择规格时（弹出窗口时在商品详细页面的 只是在页面最上面）
    1、弹出的选择窗口 但后面的页面还是能滑动的
        故要设置html的overflow:hidden 只能首屏的内容显示
       点弹出窗口上方灰色区域时 弹出窗口要display:none
        此时要html的overflow:visible 有哪些内容就显示哪些内容 可上下滑动
    2、弹出的选择窗口上选不同的规格时会对应显示其单价、库存、起卖数
        这些最好在一开始加载商品详细页面时 
         在渲染页面时就将对应的数据写在对应规格li的自定义属性上
         如data-price存单价 后面点击不同的单价时直接取this的data-price的值即可
        还有最好将无库存的规格直接在渲染时弄成不可点击
         直接在无库存的li上设置style='pointer-events:none' 再设置想要显示的无效样式
        */
function init() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/goodsList.json',
        success: function (data) {
            showList(data);
        }
    });
}
init();
function showList(json) {
    var list = json.list,
        str = '';
    list.forEach(function (ele) {
        str += '<a href="http://localhost:8080/goodsInfo.html?id='+ele.id+'"><div class="goods_item" >\
                        <img src='+ele.imgurl[0]+' alt="">\
                        <p class="item_name">'+ele.name+'</p>\
                        <p class="item_price">'+'¥'+ele.spectList[0].price+'</p>\
                </div></a>';
    })
    $('.tab_content').html($(str));
}