import React from 'react';


import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import Avatar from 'material-ui/lib/avatar';
import Divider from 'material-ui/lib/divider';

import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/action/perm-identity';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Dialog from 'material-ui/lib/dialog';


import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import LoginForm from '../../users/components/LoginForm.jsx';
import LoginSocial from '../../users/components/LoginSocial.jsx';
import RegisterForm from '../../users/components/RegisterForm.jsx';
import PasswordForm from '../../users/components/PasswordForm.jsx';

import Account from '../../users/components/Account.jsx';
import Profile from '../../users/components/Profile.jsx';



export default class extends React.Component {

  constructor(props){
    super(props);

    this.state= {
      openDialog: false,
      dialogType: "",
    };
  }

  handleOpenDialog(type) {
    this.setState({
      openDialog: true,
      dialogType: type,
    });
  }

  handleCloseDialog() {
    this.setState({openDialog: false});
  }

  handleLoginSubmit(email, password) {
    this.props.submitLoginAction(email, password, this.handleCloseDialog.bind(this));
  }

  handleLoginFacebook() {
    this.props.loginWithFacebook(this.handleCloseDialog.bind(this));
  }

  handleLoginTwitter() {
    this.props.loginWithTwitter(this.handleCloseDialog.bind(this));
  }

  handleLoginGoogle() {
    this.props.loginWithGoogle(this.handleCloseDialog.bind(this));
  }

  handleLoginGithub() {
    this.props.loginWithGithub(this.handleCloseDialog.bind(this));
  }

  handleRegisterSubmit(email, password1, password2) {
    this.props.submitRegisterAction(email, password1, password2, this.handleCloseDialog.bind(this));
  }

  handlePasswordSubmit(email) {
    this.props.submitPasswordAction(email, this.handleCloseDialog.bind(this));
  }

  handleSwitchLocale(locale) {
    this.props.switchLocaleAction(locale, this.handleCloseDialog.bind(this));
  }

  render() {

    console.log("toolbar props", this.props);

    const {locale, i18n, loggedIn, user, name, appName} = this.props;

    const {Meteor, FlowRouter} = this.props.context();

    const styles = {
      toolbar: {
        backgroundColor: "#00bcd4",
        height: 48,
      },
      rightGroup: {
        marginRight: -24,

      },
      barButton:{
        margin:0,
        paddingLeft: 0,
        color:"white",
        fontSize: "large",
      },
      barIcon:{
        paddingTop:12,
      },
      barLabel:{
        padding:"0 6px",
      },
      title: {
//        cursor: 'pointer',
        lineHeight: "48px",
//        color: "white",
      },
      dialog: {
        padding:5,
      },
    };

    const route = FlowRouter.current();

    /*                <MenuItem primaryText="用户管理"
     leftIcon={<FontIcon className="fa fa-users" />}
     onTouchTap = {() => {FlowRouter.go(`/users`);}}/>
     <MenuItem primaryText="增加用户"
     leftIcon={<FontIcon className="fa fa-user-plus" />}
     onTouchTap = {() => {FlowRouter.go(`/users/add`);}}/>
     */


    return (
      <Toolbar style={styles.toolbar}>
        <ToolbarGroup firstChild={true} float="left">
          <IconButton onTouchTap={() => {FlowRouter.go(`/`); }}><FontIcon className="fa fa-home" color="white" />
          </IconButton>
        </ToolbarGroup>
        <ToolbarGroup float="left">
          {
            route.path.startsWith("/go/sgf/")?
            <div>
              <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
              <FlatButton style={styles.barButton}
                          onTouchTap={() => {FlowRouter.go(`/go/sgf`); }}>
                <span style={styles.barLabel}>职业围棋棋谱</span>
              </FlatButton>
              <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
            </div>  : (
            route.path.startsWith("/go/game/")?
            <div>
              <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
              <FlatButton style={styles.barButton}
                          onTouchTap={() => {FlowRouter.go(`/go/game`); }}>
                <span style={styles.barLabel}>围棋对局</span>
              </FlatButton>
              <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
            </div>  : (
            route.path.startsWith("/chess/pgn/")?
            <div>
              <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
              <FlatButton style={styles.barButton}
                          onTouchTap={() => {FlowRouter.go(`/chess/pgn`); }}>
                <span style={styles.barLabel}>国际象棋棋谱</span>
              </FlatButton>
              <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
            </div>  : (
            route.path.startsWith("/chess/game/")?
            <div>
              <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
              <FlatButton style={styles.barButton}
                          onTouchTap={() => {FlowRouter.go(`/chess/game`); }}>
                <span style={styles.barLabel}>国际象棋对局</span>
              </FlatButton>
              <FontIcon className="fa fa-angle-right" color="white" style={styles.barIcon}/>
            </div>  :
            <div/>
            )))
          }
        </ToolbarGroup>
        <ToolbarGroup float="right" style={styles.rightGroup}>
          <IconMenu
            iconButtonElement={
                <IconButton><FontIcon className="fa fa-user" color={loggedIn?"lightgreen":"gainsboro"} />
                </IconButton>
              }
            targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          >

            { loggedIn?
              <div>
                <div style={{marginBottom:10, marginLeft:20}}>
                  {name}
                </div>
                <div style={{marginBottom:10, marginLeft:20}}>
                  {locale}
                </div>
                <Divider inset={false}/>
                <MenuItem primaryText="帐户"
                          leftIcon={<FontIcon className="fa fa-profile" />}
                          onTouchTap = {this.handleOpenDialog.bind(this, "account")}/>
                <MenuItem primaryText="个人信息"
                          leftIcon={<FontIcon className="fa fa-profile" />}
                          onTouchTap = {this.handleOpenDialog.bind(this, "profile")}/>
                <MenuItem primaryText="登出"
                          leftIcon={<FontIcon className="fa fa-sign-out" />}
                          onTouchTap = {() => {Meteor.logout();}}/>
                <Divider inset={false}/>
                <MenuItem primaryText="关于WeChess"
                          leftIcon={<FontIcon className="fa fa-info-circle" />}
                          onTouchTap = {this.handleOpenDialog.bind(this, "about")}/>
                <MenuItem primaryText="英语"
                          leftIcon={<FontIcon className="fa fa-info-circle" />}
                          onTouchTap = {this.handleSwitchLocale.bind(this, "en-US")}/>
                <MenuItem primaryText="中文"
                          leftIcon={<FontIcon className="fa fa-info-circle" />}
                          onTouchTap = {this.handleSwitchLocale.bind(this, "zh-CN")}/>
              </div>:
              <div>
                <MenuItem
                  primaryText="登录"
                  leftIcon={<FontIcon className="fa fa-sign-in" />}
                  onTouchTap = {this.handleOpenDialog.bind(this, "login")}
                />
                <MenuItem
                  primaryText="注册"
                  leftIcon={<FontIcon className="fa fa-user" />}
                  onTouchTap = {this.handleOpenDialog.bind(this, "register")}
                />
                <Divider inset={false}/>
                <MenuItem primaryText="关于WeChess"
                          leftIcon={<FontIcon className="fa fa-info-circle" />}
                          onTouchTap = {this.handleOpenDialog.bind(this, "about")}/>
                <MenuItem primaryText="英语"
                          leftIcon={<FontIcon className="fa fa-info-circle" />}
                          onTouchTap = {this.handleSwitchLocale.bind(this, "en-US")}/>
                <MenuItem primaryText="中文"
                          leftIcon={<FontIcon className="fa fa-info-circle" />}
                          onTouchTap = {this.handleSwitchLocale.bind(this, "zh-CN")}/>
              </div>
            }
          </IconMenu>
        </ToolbarGroup>
        <Dialog
          actions={[]}
          modal={false}
          bodyStyle={styles.dialog}
          open={this.state.openDialog}
          autoScrollBodyContent={true}
          onRequestClose={this.handleCloseDialog.bind(this)}
        >
          {
            this.state.dialogType == "about"?
            <div>
              <h3>WeChess</h3>
              <p><small>
                跨平台(Web,IOS,Android)实时对弈程序
              </small></p>
              <p>
                WeChess是基于WEB的跨平台实时对弈程序. 提供了各种棋类游戏, 如围棋, 中国象棋, 国际象棋等打谱, 朋友间友好对弈, 人机对弈等功能.
              </p>
              <p>
                WeChess与各社交平台如微信, 微博, facebook, twitter等直接关联, 可以自动登录并邀请好友随时对弈.
              </p>
              <p>
                WeChess将带来一种全新的棋类游戏体验, 让我们随时随地享受对弈的乐趣.
              </p>
            </div>: (
              this.state.dialogType == "login"?
              <Tabs tabItemContainerStyle={{backgroundColor:'darkcyan'}}>

                <Tab label="WeChess登录" >

                  <LoginForm {...this.props}
                    handleLoginSubmit={this.handleLoginSubmit.bind(this)}
                  />

                  <div>
                    <FlatButton
                      secondary={true}
                      label="忘记密码"
                      onTouchTap={this.handleOpenDialog.bind(this, "password")} />
                  </div>
                  <div>
                    <FlatButton
                      secondary={true}
                      label="注册一个账户"
                      onTouchTap={this.handleOpenDialog.bind(this, "register")} />
                  </div>
                </Tab>

                <Tab label="社交平台登录" >
                  <LoginSocial {...this.props}
                    handleLoginFacebook={this.handleLoginFacebook.bind(this)}
                    handleLoginTwitter={this.handleLoginTwitter.bind(this)}
                    handleLoginGoogle={this.handleLoginGoogle.bind(this)}
                    handleLoginGithub={this.handleLoginGithub.bind(this)}
                  />
                </Tab>
              </Tabs>:(
                this.state.dialogType == "register"?
                <div>
                  <h3>注册新的帐号</h3>

                  <RegisterForm {...this.props}
                    handleRegisterSubmit={this.handleRegisterSubmit.bind(this)}
                    />

                  <div>
                    <FlatButton
                      secondary={true}
                      label="登录现有帐号"
                      onTouchTap={this.handleOpenDialog.bind(this, "login")} />
                  </div>
                </div>:(
                  this.state.dialogType == "password"?
                    <div>
                    <h3>忘记密码</h3>

                    <PasswordForm {...this.props}
                      handlePasswordSubmit={this.handlePasswordSubmit.bind(this)}
                    />

                    <div>
                      <FlatButton
                        secondary={true}
                        label="登录现有帐号"
                        onTouchTap={this.handleOpenDialog.bind(this, "login")} />
                    </div>
                  </div>:(
                    this.state.dialogType == "account"?
                    <Account />:(
                      this.state.dialogType == "profile"?
                      <Profile />:<div />
                    )
                  )
                )
              )
            )
          }
        </Dialog>

      </Toolbar>
    );
  }
}

