 <template>
  <div>
    <div :class="showTotal ? 'total-introduce' : 'detailed-introduce'">
      <div class="intro-content" :title="introduce" ref="desc">
        <span class="merchant-desc" v-if="introduce">
          <span v-html="introduce"></span>
        </span>
        <div class="unfold" @click="showTotalIntro" v-if="showExchangeButton">
          <p>{{exchangeButton ? '展开' : '收起'}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Spread',
  props:['text'],
  data () {
    return {
      introduce: "",
      // 是否展示所有文本内容
      showTotal: true,
      // 显示展开还是收起
      exchangeButton: true,
      // 是否显示展开收起按钮
      showExchangeButton: false,
      rem: '',
      // text:text,
    };
  },
  mounted () {
    //console.log("开始mounted！")
    this.init();
    //console.log("执行了mountedinit方法")
  },
  methods: {
    showTotalIntro () {
      //console.log("this.showTotal:"+this.showTotal);
      this.showTotal = !this.showTotal;
      this.exchangeButton = !this.exchangeButton;
    },
    getRem () {
      //console.log('getRem');
      const defaultRem = 16;
      let winWidth = window.innerWidth;
      //console.log('winWidth:' + winWidth);
      let rem = winWidth / 375 * defaultRem;
      return rem;
    },
    init () {
      // this.introduce = '拥有财富、名声、权力，这世界上的一切的男人--哥尔·D·罗杰，在被行刑受死之前说了一句话，让全世界的人都涌向了大海。“想要我的宝藏吗？如果想要的话，那就到海上去找吧，我全部都放在那里。”，世界开始迎接“大海贼时代”的来临。拥有财富、名声、权力，这世界上的一切的男人 “海贼王”哥尔·D·罗杰，在被行刑受死之前说了一句话，让全世界的人都涌向了大海。“想要我的宝藏吗？如果想要的话，那就到海上去找吧，我全部都放在那里。”，世界开始迎接“大海贼时代”的来临。';
      this.introduce = this.text;
      //console.log("init了introduce数据");

    }
  },
  watch: {
    deep: true,
    'introduce': function () {
      //console.log("开始watch！");
      this.$nextTick(function () {
        //console.log('开始nextTick');
        // 判断介绍是否超过四行
        let rem = parseFloat(this.getRem());
        //console.log('watch 中的rem', rem);
        if (!this.$refs.desc) {
          //console.log('desc null');
          return;
        }
        let descHeight = window.getComputedStyle(this.$refs.desc).height.replace('px', '');
        //console.log('descHeight:' + descHeight);
        //console.log('如果 descHeight 超过' + (5.25 * rem) + '就要显示展开按钮');
        if (descHeight > 2 * rem) {
          console.log('超过了四行');
          // 显示展开收起按钮
          this.showExchangeButton = true;
          this.exchangeButton = true;
          // 不是显示所有
          this.showTotal = false;
        } else {
          // 不显示展开收起按钮
          this.showExchangeButton = false;
          // 没有超过四行就显示所有
          this.showTotal = true;
          //console.log('showExchangeButton', this.showExchangeButton);
          //console.log('showTotal', this.showTotal);
        }
      }.bind(this));
    }
  }
};
</script>

<style lang="less" scoped rel="stylesheet/less">
  .top-prove {
    height: 100px;
    width: 100%;
    background: #dddddd;
    text-align: center;
    line-height: 100px;
  }
  .total-introduce {
    height: auto;
    overflow: hidden;
    font-size: 14px;
    color: #434343;
    margin: 10px;
    .intro-content {
      .merchant-desc {
        width: 100%;
        line-height: 21px;
      }
    }
    .unfold {
      display: block;
      z-index: 11;
      float: right;
      width: 40px;
      height: 21px;
      p {
        margin: 0;
        line-height: 21px;
        color: #7fbe87;
      }
    }
  }
  .detailed-introduce {
    font-size: 14px;
    color: #434343;
    position: relative;
    overflow: hidden;
    margin: 10px;
    .intro-content {
      // 最大高度设为4倍的行间距
      max-height: 84px;
      line-height: 21px;
      word-wrap: break-word;
      /*强制打散字符*/
      word-break: break-all;
      background: #ffffff;
      /*同背景色*/
      color: #ffffff;
      overflow: hidden;
      .merchant-desc {
        width: 100%;
        line-height: 21px;
      }
      &:after,
      // 这是展开前实际显示的内容
      &:before {
        content: attr(title);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        color: #434343
        // overflow: hidden;
      }
      // 把最后最后一行自身的上面三行遮住
      &:before {
        display: block;
        overflow: hidden;
        z-index: 1;
        max-height: 63px;
        background: #ffffff;
      }
      &:after {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        height: 81px;
        /*截取行数*/
        -webkit-line-clamp: 4;
        text-overflow: ellipsis;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        /*行首缩进字符数，值为[(截取行数-1)*尾部留空字符数]*/
        text-indent: -12em;
        /*尾部留空字符数*/
        padding-right: 4em;
      }
      .unfold {
        z-index: 11;
        width: 40px;
        height: 21px;
        outline: 0;
        position: absolute;
        right: 0;
        bottom: 0;
        p {
          margin: 0;
          line-height: 21px;
          color: #7fbe87;
        }
      }
    }
  }
  .bottom-prove {
    height: 100px;
    width: 100%;
    background: #dddddd;
    text-align: center;
    line-height: 100px;
  }
  .change-buttom {
    font-size: 14px;
    color: #2371be;
    .long {
      text-align: 21px;
      text-align: center;
      height: 21px;
    }
    .short {
      text-align: 21px;
      text-align: center;
      height: 20px;
    }
  }
</style>
