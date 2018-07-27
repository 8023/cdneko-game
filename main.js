var pointList = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
var colorList = ['黑桃♠', '梅花♣', '方片♦', '红桃♥'];

var count = 0
var total = 10;
var acount = 0;
var foulcount = 0;

var v = new Vue({
    el: '#app',
    data: {
        btns: [{
            color: '#F00',
            text: '已犯规',
            click: () => {
                v.poker(false);
            }
        }, {
            color: '#000',
            text: '已完成',
            click: () => {
                v.poker(true);
            }
        }],
        items: []
    },
    methods: {
        clear: function() {
            v.items = [];
            count = 0;
            total = 10;
            acount = 0;
            foulcount = 0;
        },
        introduce: function() {
            this.$dialog.confirm({
                title: '玩法介绍',
                mes: '准备：</br>从头到脚女装自己，灌肠，准备根假阳具，一个贞操锁，一副扑克牌，然后就可以开始挑战啦。</br></br>玩法：</br>首先随机抽取10张未知的扑克牌，按照自己喜欢的顺序摆放好，然后打开第一张，红色代表你必须要被假阳具抽插菊穴，黑色则代称你必须要打飞机。牌面的点数代表这一轮挑战的时间（分钟），在完成挑战前决不允许打开下一张牌，直到完成最后一张牌，最后一张牌如果是黑色则代表你能以射精的方式来结束挑战，如果是红色则代表高潮是被禁止的，你将要戴上贞操锁直到进行下一次挑战，当然，你也可以马上上进行第二轮挑战。</br></br>惩罚：</br>1、如在红牌挑战阶段触碰阴茎将增加一张牌，第二次触摸便增加两张，依次类推。</br>2、如在挑战结束前便射精的，剩余扑克牌一律视为红牌，强制进行游戏，当然，乖女孩被插射的话将不会受到惩罚。</br>3、如挑战内出现两张A将增加两张扑克牌。',
                opts: [{
                    txt: '确定',
                    color: true,
                    callback: () => {
                        this.$dialog.toast({mes: 'have fun~', timeout: 1000});
                    }
                }]
            });
        },
        poker: function(flag) {
            count++;

            var obj = {};
            obj.number = count;
            obj.point = pointList[Math.floor(Math.random()*pointList.length)];
            obj.color = colorList[Math.floor(Math.random()*colorList.length)];

            if (obj.point == 'A') {
                acount++;
            };
            if (acount >= 2) {
                obj.surplus = (total - count) + '+2(对A)'
                total += 2;
                acount = 0;
            } else {
                obj.surplus = total - count;
            };
            if (!flag) {
                foulcount++;
                obj.surplus += '+' + String(foulcount) + '(犯规)';
                total += foulcount;
            };

            if (colorList.indexOf(obj.color) < 2) { //前两个颜色是黑的
                obj.task = '自慰 ' + String(pointList.indexOf(obj.point) + 1) + ' 分钟';
            } else { //后两个是红的
                obj.task = '抽插 ' + String(pointList.indexOf(obj.point) + 1) + ' 分钟';
            };

            if (String(obj.surplus).indexOf('-') == 0) {
                if (colorList.indexOf(v.items[v.items.length - 1].color) < 2) { //黑色允许高潮
                    this.$dialog.confirm({
                        title: '任务完成',
                        mes: '最后一张卡片颜色为黑色, 请尽情获取高潮吧~ 再来一轮试试运气?',
                        opts: () => {
                            v.clear();
                        }
                    });
                } else {
                    this.$dialog.confirm({
                        title: '任务完成',
                        mes: '最后一张卡片颜色为红色, 暂时禁止获取高潮, 或者继续新一轮任务?',
                        opts: () => {
                            v.clear();
                        }
                    });
                };
            } else {
                v.items.push(obj);
            }
        }
    }
});