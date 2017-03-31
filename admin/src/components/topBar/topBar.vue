<template>
  <header bascrollposition="" class="w-topbar clearfix" maxheight="50">
    <a class="m-logo" routerlink="/pages/dashboard" href="#/pages/dashboard"><span>vue2-</span>admin</a>
    <a class="collapse-menu-link ion-navicon" href=""></a>

    <div class="m-search">
      <i class="ion-ios-search-strong" ng-click="startSearch()"></i>
      <input id="searchInput" placeholder="Search for..." type="text">
    </div>

    <div class="m-user">
      <div class="dropdown al-user-profile">
        <a aria-expanded="false" class="profile-toggle-link dropdown-toggle" data-toggle="dropdown" id="user-profile-dd">
          <img src="assets/img/app/profile/Nasta.png">
        </a>
        <ul aria-labelledby="user-profile-dd" class="dropdown-menu top-dropdown-menu profile-dropdown">
          <li class="dropdown-item"><i class="dropdown-arr"></i></li>
          <li class="dropdown-item"><a href=""><i class="fa fa-user"></i>Profile</a></li>
          <li class="dropdown-item"><a href=""><i class="fa fa-cog"></i>Settings</a></li>
          <li class="dropdown-item"><a class="signout" href=""><i class="fa fa-power-off"></i>Sign out</a></li>
        </ul>
      </div>
      <!--<ba-msg-center _nghost-fpf-7=""><ul _ngcontent-fpf-7="" class="al-msg-center clearfix">
        <li _ngcontent-fpf-7="" class="dropdown">
          <a _ngcontent-fpf-7="" aria-expanded="false" class="dropdown-toggle" data-toggle="dropdown" href="" id="msg-dd1">
            <i _ngcontent-fpf-7="" class="fa fa-bell-o"></i><span _ngcontent-fpf-7="">5</span>

            <div _ngcontent-fpf-7="" class="notification-ring"></div>
          </a>

          <div _ngcontent-fpf-7="" aria-labelledby="msg-dd1" class="top-dropdown-menu dropdown-menu">
            <i _ngcontent-fpf-7="" class="dropdown-arr"></i>

            <div _ngcontent-fpf-7="" class="header clearfix">
              <strong _ngcontent-fpf-7="">Notifications</strong>
              <a _ngcontent-fpf-7="" href="">Mark All as Read</a>
              <a _ngcontent-fpf-7="" href="">Settings</a>
            </div>
            <div _ngcontent-fpf-7="" class="msg-list">
              &lt;!&ndash;template bindings={}&ndash;&gt;<a _ngcontent-fpf-7="" class="clearfix" href="">
              <div _ngcontent-fpf-7="" class="img-area"><img _ngcontent-fpf-7="" class="photo-msg-item" src="assets/img/app/profile/Vlad.png"></div>
              <div _ngcontent-fpf-7="" class="msg-area">
                <div _ngcontent-fpf-7="">Vlad posted a new article.</div>
                <span _ngcontent-fpf-7="">1 min ago</span>
              </div>
            </a><a _ngcontent-fpf-7="" class="clearfix" href="">
              <div _ngcontent-fpf-7="" class="img-area"><img _ngcontent-fpf-7="" class="photo-msg-item" src="assets/img/app/profile/Kostya.png"></div>
              <div _ngcontent-fpf-7="" class="msg-area">
                <div _ngcontent-fpf-7="">Kostya changed his contact information.</div>
                <span _ngcontent-fpf-7="">2 hrs ago</span>
              </div>
            </a><a _ngcontent-fpf-7="" class="clearfix" href="">
              <div _ngcontent-fpf-7="" class="img-area"><img _ngcontent-fpf-7="" src="assets/img/shopping-cart.svg"></div>
              <div _ngcontent-fpf-7="" class="msg-area">
                <div _ngcontent-fpf-7="">New orders received.</div>
                <span _ngcontent-fpf-7="">5 hrs ago</span>
              </div>
            </a><a _ngcontent-fpf-7="" class="clearfix" href="">
              <div _ngcontent-fpf-7="" class="img-area"><img _ngcontent-fpf-7="" class="photo-msg-item" src="assets/img/app/profile/Andrey.png"></div>
              <div _ngcontent-fpf-7="" class="msg-area">
                <div _ngcontent-fpf-7="">Andrey replied to your comment.</div>
                <span _ngcontent-fpf-7="">1 day ago</span>
              </div>
            </a><a _ngcontent-fpf-7="" class="clearfix" href="">
              <div _ngcontent-fpf-7="" class="img-area"><img _ngcontent-fpf-7="" class="photo-msg-item" src="assets/img/app/profile/Nasta.png"></div>
              <div _ngcontent-fpf-7="" class="msg-area">
                <div _ngcontent-fpf-7="">Today is Nasta's birthday.</div>
                <span _ngcontent-fpf-7="">2 days ago</span>
              </div>
            </a><a _ngcontent-fpf-7="" class="clearfix" href="">
              <div _ngcontent-fpf-7="" class="img-area"><img _ngcontent-fpf-7="" src="assets/img/comments.svg"></div>
              <div _ngcontent-fpf-7="" class="msg-area">
                <div _ngcontent-fpf-7="">New comments on your post.</div>
                <span _ngcontent-fpf-7="">3 days ago</span>
              </div>
            </a><a _ngcontent-fpf-7="" class="clearfix" href="">
              <div _ngcontent-fpf-7="" class="img-area"><img _ngcontent-fpf-7="" class="photo-msg-item" src="assets/img/app/profile/Kostya.png"></div>
              <div _ngcontent-fpf-7="" class="msg-area">
                <div _ngcontent-fpf-7="">Kostya invited you to join the event.</div>
                <span _ngcontent-fpf-7="">1 week ago</span>
              </div>
            </a>
            </div>
            <a _ngcontent-fpf-7="" href="">See all notifications</a>
          </div>
        </li>
        <li _ngcontent-fpf-7="" class="dropdown">
          <a _ngcontent-fpf-7="" aria-expanded="false" class="msg dropdown-toggle" data-toggle="dropdown" href="" id="msg-dd2">
            <i _ngcontent-fpf-7="" class="fa fa-envelope-o"></i><span _ngcontent-fpf-7="">5</span>
            <div _ngcontent-fpf-7="" class="notification-ring"></div>
          </a>
          <div _ngcontent-fpf-7="" aria-labelledby="msg-dd2" class="top-dropdown-menu dropdown-menu">
            <i _ngcontent-fpf-7="" class="dropdown-arr"></i>
            <div _ngcontent-fpf-7="" class="header clearfix">
              <strong _ngcontent-fpf-7="">Messages</strong>
              <a _ngcontent-fpf-7="" href="">Mark All as Read</a>
              <a _ngcontent-fpf-7="" href="">Settings</a>
            </div>
            <div _ngcontent-fpf-7="" class="msg-list">
              &lt;!&ndash;template bindings={}&ndash;&gt;<a _ngcontent-fpf-7="" class="clearfix" href="">
              <div _ngcontent-fpf-7="" class="img-area"><img _ngcontent-fpf-7="" class="photo-msg-item" src="assets/img/app/profile/Nasta.png"></div>
              <div _ngcontent-fpf-7="" class="msg-area">
                <div _ngcontent-fpf-7="">After you get up and running, you can place Font Awesome icons just about...</div>
                <span _ngcontent-fpf-7="">1 min ago</span>
              </div>
            </a><a _ngcontent-fpf-7="" class="clearfix" href="">
              <div _ngcontent-fpf-7="" class="img-area"><img _ngcontent-fpf-7="" class="photo-msg-item" src="assets/img/app/profile/Vlad.png"></div>
              <div _ngcontent-fpf-7="" class="msg-area">
                <div _ngcontent-fpf-7="">You asked, Font Awesome delivers with 40 shiny new icons in version 4.2.</div>
                <span _ngcontent-fpf-7="">2 hrs ago</span>
              </div>
            </a><a _ngcontent-fpf-7="" class="clearfix" href="">
              <div _ngcontent-fpf-7="" class="img-area"><img _ngcontent-fpf-7="" class="photo-msg-item" src="assets/img/app/profile/Kostya.png"></div>
              <div _ngcontent-fpf-7="" class="msg-area">
                <div _ngcontent-fpf-7="">Want to request new icons? Here's how. Need vectors or want to use on the...</div>
                <span _ngcontent-fpf-7="">10 hrs ago</span>
              </div>
            </a><a _ngcontent-fpf-7="" class="clearfix" href="">
              <div _ngcontent-fpf-7="" class="img-area"><img _ngcontent-fpf-7="" class="photo-msg-item" src="assets/img/app/profile/Andrey.png"></div>
              <div _ngcontent-fpf-7="" class="msg-area">
                <div _ngcontent-fpf-7="">Explore your passions and discover new ones by getting involved. Stretch your...</div>
                <span _ngcontent-fpf-7="">1 day ago</span>
              </div>
            </a><a _ngcontent-fpf-7="" class="clearfix" href="">
              <div _ngcontent-fpf-7="" class="img-area"><img _ngcontent-fpf-7="" class="photo-msg-item" src="assets/img/app/profile/Nasta.png"></div>
              <div _ngcontent-fpf-7="" class="msg-area">
                <div _ngcontent-fpf-7="">Get to know who we are - from the inside out. From our history and culture, to the...</div>
                <span _ngcontent-fpf-7="">1 day ago</span>
              </div>
            </a><a _ngcontent-fpf-7="" class="clearfix" href="">
              <div _ngcontent-fpf-7="" class="img-area"><img _ngcontent-fpf-7="" class="photo-msg-item" src="assets/img/app/profile/Kostya.png"></div>
              <div _ngcontent-fpf-7="" class="msg-area">
                <div _ngcontent-fpf-7="">Need some support to reach your goals? Apply for scholarships across a variety of...</div>
                <span _ngcontent-fpf-7="">2 days ago</span>
              </div>
            </a><a _ngcontent-fpf-7="" class="clearfix" href="">
              <div _ngcontent-fpf-7="" class="img-area"><img _ngcontent-fpf-7="" class="photo-msg-item" src="assets/img/app/profile/Vlad.png"></div>
              <div _ngcontent-fpf-7="" class="msg-area">
                <div _ngcontent-fpf-7="">Wrap the dropdown's trigger and the dropdown menu within .dropdown, or...</div>
                <span _ngcontent-fpf-7="">1 week ago</span>
              </div>
            </a>
            </div>
            <a _ngcontent-fpf-7="" href="">See all messages</a>
          </div>
        </li>
      </ul>
      </ba-msg-center>-->
    </div>
  </>
</template>
<script>
</script>
<style lang="postcss">
  .w-topbar{
    background-color: #282828;
    position: fixed;
    z-index: 904;
    box-shadow: 2px 0 3px rgba(0,0,0,0.5);
    height: 66px;
    width: 100%;
    min-width: 320px;
    padding: 0 32px 0 40px;
  }
  .m-logo{
    color: #fff;
    display: block;
    font-size: 24px;
    font-family: "Roboto",sans-serif;
    white-space: nowrap;
    float: left;
    line-height: 60px;
    & span{
      color: #00abff;
    }
  }
  .m-search{
    text-shadow: none;
    font-size: 13px;
    line-height: 25px;
    transition: all 0.5s ease;
    white-space: nowrap;
    overflow: hidden;
    width: 162px;
    float: left;
    margin: 20px 0 0 30px;
    & i{
        width: 16px;
        display: inline-block;
        cursor: pointer;
        padding-left: 1px;
        font-size: 16px;
        margin-right: 13px;
    }
    & input{
        color: #fff;
        background: none;
        border: none;
        outline: none;
        width: 120px;
        padding: 0;
        margin: 0 0 0 -3px;
        height: 27px;
    }
  }
  .m-user{
    float: right;
    min-width: 230px;
    margin-top: 10px;
  }
</style>
