angular.module('starter.controllers', [])
    // 预留可以删除
    .controller('FriendsCtrl', function ($scope, Friends) {
        $scope.friends = Friends.all();
    })

    // 预留可以删除
    .controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
        $scope.friend = Friends.get($stateParams.friendId);
    })

    // 许愿的列表
    .controller('XYListCtrl', function ($rootScope,$scope, $ionicLoading) {
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

        $scope.click = function(id){
            console.log("click:"+id);
        }
    })

    // 增加我的毕业说
    .controller('AddXyCtrl', function($rootScope,$scope, $ionicLoading){
        $scope.xy = {content:null};
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
                        //alert(obj.url());

//                    alert();
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

    })
;
