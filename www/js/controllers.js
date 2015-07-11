angular.module('starter.controllers', ['ngCordova'])
    // 预留可以删除
    .controller('FriendsCtrl', function ($scope, Friends) {
        $scope.friends = Friends.all();
    })

    // 预留可以删除
    .controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
        $scope.friend = Friends.get($stateParams.friendId);
    })

    // 许愿的列表
    .controller('XYListCtrl', function ($rootScope, $scope, $ionicLoading) {
        //TODO 增加对某一个评论点赞的方法
        $scope.goZan = function(xy){
            alert(xy);

            var query = new Bmob.Query("_User");
            query.first({
                //查询要保存的用户，这个对象应该要被序列话到本地
                success: function (user) {
                    $rootScope.user = user;
                    // 添加到赞列表
                    var zanObject = Bmob.Object.extend("Zan");
                    // 插入许愿列表
                    //var aa = Bmob.Query(Xy_List);
                    var zan = new zanObject();
                    // Pointer指针
                    zan.set("userId",user);
                    zan.save(null,{
                        success:function(zan){
                            // 添加成功之后，将之前查询到的评论信息的relation字段重置。关联起来
                            var relation = xy.relation("zan");
                            relation.add(zan);
                            xy.save();
                            alert("保存成功");
                        },
                        error:function(ddd, error){
                            alert("抱歉，学长，错了。。"+error.message);
                        }
                    });
                }
            });
        }

        $scope.goXy = function(id){
            alert(id);
        }

        // 初始化宣言墙的
        Bmob.initialize("44022f09eb84ad42e812bbbb9f2894c4", "629112d8473f92cc6780ace14a1ab5aa");
        loadMore = function () {
            if (showLoading) {
                $ionicLoading.show({template: '加载中...'});
            }
            // 宣言列表
            var XyList = Bmob.Object.extend("Xy_List",{
                // 实例方法
                test1:function(){
                    return "YES";
                }
            },{
                // 静态方法
                test2:function(){
                    return new XyList();
                },

                test3:function(){
                    return "YES3";
                }
            });

            var query = new Bmob.Query(XyList);
            query.limit(5);
            query.skip(skip);
            query.descending("updatedAt");

            // 查询所有数据
            query.find({
                success: function (results) {
                    if (results.length > 0) {
                        $scope.more = true;
                        skip += results.length;
                        console.log("skip===>:" + skip);
                        angular.forEach(results, function (result) {
                            $scope.results.push(result);
                        });
                    } else {
                        $scope.more = false;
                    }

                    $ionicLoading.hide();
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                },
                error: function (error) {
                    alert("查询失败: " + error.code + " " + error.message);
                    $ionicLoading.hide();
                }
            });
        }

        //下拉刷新
        $scope.hardRefresh = function () {
            showLoading = false;
            loadMore();
        }

        $scope.more = true;
        $scope.results = [];
        var skip = 0;
        $scope.loadMorePost = function () {
            console.log('loadmore========>>>');
            showLoading = false;
            loadMore();
        }


    })

    // 增加我的毕业说
    .controller('AddXyCtrl', function($rootScope,$scope, $ionicLoading){
        $scope.xy = {content:null};


        //TODO 增加用户评论的方法
        $scope.addComment = function() {
            var query = new Bmob.Query("_User");
            query.first({
                //查询要保存的用户，这个对象应该要被序列话到本地
                success: function (user) {
                    // FIXME 这里需要做第三方登陆，之后把成功的用户信息保存到本地，目前这里只是查询数据中第一条数据，模拟

                    $rootScope.user = user;
                    // FIXME 上传宣言墙的图片, 这里只测试本地的字符串保存到BMOB的file字段
                    var bytes = "Hello, World!";
                    var file = new Bmob.File("hello.txt", bytes);
                    file.save().then(function(obj) {
                        localStorage.setItem( 'data', JSON.stringify(user) );
                        var aa = localStorage.getItem('data');
                        var outP = eval('('+aa+')');
                        console.log(outP);


                        var Xy_List = Bmob.Object.extend("Xy_List");
                        // 插入许愿列表
                        //var aa = Bmob.Query(Xy_List);
                        var ddd = new Xy_List();

                        ddd.set("title",$scope.xy.content);
                        // Pointer指针
                        ddd.set("userId",user);
                        ddd.set("image",obj);

                        ddd.save(null,{
                            success:function(ddd){
                                alert("你的毕业说已经到宣言墙啦");
                                var relation = ddd.relation("commentId");
                            },
                            error:function(ddd, error){
                                alert("抱歉，学长，错了。。"+error.message);
                            }
                        });
                    }, function(error) {
                        // the save failed.
                    });


                },
                error: function(error) {
                    alert("查询失败: " + error.code + " " + error.message);
                }
            });
        }
    })


    // 我的设置
    .controller('MyBoardCtrl', function ($rootScope,$scope, $ionicLoading) {
        $scope.testShare = function() {

        }
    })

    .controller('ShareCtrl', function ($ionicPlatform, $cordovaFile, $rootScope,$scope, $ionicLoading) {
        //

        $ionicPlatform.ready(function() {
//            $cordovaPlugin.someFunction().then(success, error);
            alert('ready');
        });

//        $cordovaFile.getFreeDiskSpace()
//            .then(function (success) {
//                // success in kilobytes
//                alert(success);
//            }, function (error) {
//                // error
//                alert(error);
//            });
//
        var opt = {
            'data' : {
                'content' : {
                    'text' : 'fffff' //要分享的文字
                }
            }
        }
//        $("#btn").umshare(opt);
        window.umappkey = '55064267fd98c5a4a500076d';//5598edc167e58e4247001e1e 设置来自友盟的APPKEY,请从友盟网站申请http://www.umeng.com
        //login
        $scope.loginBtn = function() {
            console.log('start login');
            $.fn.umshare.login('sina', function (user) {
                console.log('usersuerseru');
                $.fn.umshare.tip('登录成功,token:' + user.token + ', uid:' + user.uid);


//                $("#loginInfo").html('登录成功,token:' + user.token + ', uid:' + user.uid);
            });

//            $.fn.umshare.screenshot(function(url){
//                alert("url:" + url);
//                var opt = {
//                    'data' : {
//                        'content' : {
//                            'text' : '友盟分享组件帮您接入和升级微博、微信等社交平台，快速武装您的应用！',
//                            'img' : url
//                        }
//                    }
//                }
//                $.fn.umshare.share('sina',opt);
//            });
        }
    });
