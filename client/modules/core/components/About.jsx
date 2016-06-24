import React from 'react';

import styles from '../../../libs/styles.js';

export default class extends React.Component{

  render() {

    const {locale, i18n, appName} = this.props;

    return (
      locale == "zh-CN"?
        <div>
          <div style={styles.header}>{appName}</div>
          <p>跨平台(Web,IOS,Android)实时对弈程序</p>
          <p>{appName}提供了各种棋类游戏,
            如围棋、中国象棋、国际象棋等打谱、朋友间友好对弈、人机对弈等功能。</p>
          <p>{appName}与各社交平台如微信、微博、facebook、twitter等直接关联，可以自动登录并邀请好友随时对弈。</p>
          <p>{appName}将带来一种全新的棋类游戏体验，让我们随时随地享受对弈的乐趣。</p>
        </div>:
        <div>
          <div style={styles.header}>{appName}</div>
          <p>Cross platform (Web,IOS,Android) real time chess application</p>
          <p>{appName} provides all kinds of chess game, like Chess, Go, Chinese chess. Users can use it
            to replay professional manuals, playing with friends or playing with machines.</p>
          <p>{appName} connect with all kinds of social platform, like faceboo, twitter, wechat, weibo.
            Users can login through these platform and invite friends to play game anytime.</p>
          <p>{appName} will bring you a totally new chess game experience. Let's enjoy chess game anytime anywhere.</p>

        </div>
    );
  }
}
