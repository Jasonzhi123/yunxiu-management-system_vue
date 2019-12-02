<template>
  <div class="container">
    <div class="lin-info">
      <div class="lin-info-left">
        <div class="welcome">
          <img src="../../assets/img/about/welcome.png" class="welcome-title" alt="">
          <div class="subtitle">
            <div class="guide">您还可以点击林间有风官方网站，查看更多作品</div>
            <div class="link"><a href="http://www.7yue.pro" target="_blank">http://www.7yue.pro</a></div>
          </div>
        </div>
        <img class="welcome-bg" src="../../assets/img/about/header-bg.png" alt="">
      </div>
      <div class="lin-info-right">
        <div class="team-detail">
          <div class="team-box">
            <div class="team-title">产品团队</div>
            <ul class="team-ul">
              <li>
                <span class="shadow-box">
                  <i class="team-shadow"></i>
                </span>
                <span class="team-role">策划</span>
                <span class="team-name">七月</span>
              </li>
              <li>
                <span class="shadow-box">
                  <i class="team-shadow"></i>
                </span>
                <span class="team-role">研发</span>
                <span class="team-name">
                  <ul v-if="!showTeam">
                    <li>Pedro</li>
                    <li>一飞</li>
                    <li>凉面</li>
                    <li>圈圈</li>
                    <li>家乐</li>
                    <li>Jocky</li>
                    <li>流乔</li>
                  </ul>
                  <ul v-else>
                    <li>林间有风 CMS 组</li>
                  </ul>
                </span>
              </li>
              <li>
                <span class="shadow-box">
                  <i class="team-shadow"></i>
                </span>
                <span class="team-role">设计</span>
                <span class="team-name">瓜瓜</span>
              </li>
            </ul>
          </div>
          <div class="team-icon">
            <img src="../../assets/img/about/qrcode.jpg" alt="">
          </div>
          <p class="team-label">林间有风公众号</p>
        </div>
      </div>
    </div>
    <div class="quantity-statistics">
      <div class="quantity-item">
        <div class="quantity-detail">
          <div class="quantity-detail-box">
            <div class="quantity-title">总访问量</div>
            <div class="quantity-border-line"></div>
            <div class="quantity">11,590</div>
          </div>
        </div>
        <div class="quantity-icon">
          <img src="../../assets/img/about/icon.png" alt="">
        </div>
      </div>
      <div class="quantity-item">
        <div class="quantity-detail">
          <div class="quantity-detail-box">
            <div class="quantity-title">总用户数</div>
            <div class="quantity-border-line"></div>
            <div class="quantity">51,862</div>
          </div>
        </div>
        <div class="quantity-icon">
          <img src="../../assets/img/about/icon.png" alt="">
        </div>
      </div>
      <div class="quantity-item">
        <div class="quantity-detail">
          <div class="quantity-detail-box">
            <div class="quantity-title">新增访问量 (月)</div>
            <div class="quantity-border-line"></div>
            <div class="quantity">1,862</div>
          </div>
        </div>
        <div class="quantity-icon">
          <img src="../../assets/img/about/icon.png" alt="">
        </div>
      </div>
      <div class="quantity-item">
        <div class="quantity-detail">
          <div class="quantity-detail-box">
            <div class="quantity-title">新增用户数</div>
            <div class="quantity-border-line"></div>
            <div class="quantity">1,323</div>
          </div>
        </div>
        <div class="quantity-icon">
          <img src="../../assets/img/about/icon.png" alt="">
        </div>
      </div>
    </div>
    <div class="information">
      <div class="personal">
        <div class="personal-title">个人信息</div>
        <img src="../../assets/img/about/avatar.png" class="personal-avatar" />
        <div class="personal-influence">
          <div class="personal-influence-item">
            <div class="personal-influence-num color1">5411</div>
            <div class="personal-influece-label">总访问量</div>
          </div>
          <div class="personal-influence-item">
            <div class="personal-influence-num color2">913</div>
            <div class="personal-influece-label">粉丝</div>
          </div>
          <div class="personal-influence-item">
            <div class="personal-influence-num color3">72</div>
            <div class="personal-influece-label">作品</div>
          </div>
        </div>
        <el-tabs v-model="activeName" class="personal-tabs">
          <el-tab-pane label="最新作品" name="first">
            <div class="content">How to Contribute to Open Source?</div>
          </el-tab-pane>
          <el-tab-pane label="最热作品" name="second">
            <div class="content">为什么程序员们愿意在GitHub上开源...</div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="article">
        <div class="article-title">文章</div>
        <div class="article-list">
          <div class="article-item" @click="handleArticle('https://opensource.guide/how-to-contribute/')">
            <img class="article-thumb" src="../../assets/img/about/open-source.jpg" alt="">
            <div class="article-detail">
              <p class="article-detail-title">How to Contribute to Open Source?</p>
              <div class="article-detail-content">
                Whether you just made your first open source contribution, or you’re looking for new ways to contribute, we hope you’re inspired to take action.
                Even if your contribution wasn’t accepted, don’t forget to say thanks when a maintainer put effort into helping you.
                Open source is made by people like you: one issue, pull request, comment, or high-five at a time.
              </div>
              <div class="article-tool">
                <div class="pubdate">一天前</div>
                <div class="article-about">
                  <span><i class="iconfont icon-shoucang"></i>37</span>
                  <el-divider direction="vertical"></el-divider>
                  <span><i class="iconfont icon-pinglun"></i>2384</span>
                  <el-divider direction="vertical"></el-divider>
                  <span><i class="iconfont icon-fenxiang"></i>56</span>
                </div>
              </div>
            </div>
          </div>
          <div class="article-item" @click="handleArticle('https://www.zhihu.com/question/269033309')">
            <img class="article-thumb" src="../../assets/img/about/open-source.jpg" alt="">
            <div class="article-detail article-last">
              <p class="article-detail-title">为什么程序员们愿意在GitHub上开源自己的成果给别人免费使用和学习？</p>
              <div class="article-detail-content">
                “Git的精髓在于让所有人的贡献无缝合并。而GitHub的天才之处，在于理解了Git的精髓。”来一句我们程序员们接地气的话：分享是一种快乐~
              </div>
              <div class="article-tool">
                <div class="pubdate">2019年5月26日</div>
                <div class="article-about">
                  <span><i class="iconfont icon-shoucang"></i>37</span>
                  <el-divider direction="vertical"></el-divider>
                  <span><i class="iconfont icon-pinglun"></i>2384</span>
                  <el-divider direction="vertical"></el-divider>
                  <span><i class="iconfont icon-fenxiang"></i>56</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      activeName: 'first',
      showTeam: false,
    }
  },
  mounted() {
    if (document.body.clientWidth > 1200 && document.body.clientWidth < 1330) {
      this.showTeam = true
    }
  },
  methods: {
    handleArticle(link) {
      window.open(link)
    },
  },
}
</script>

<style  lang="scss">
@import './index.scss';
</style>
