angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope, $ionicLoading) {
        Bmob.initialize("e82b65be640f7f5fc3eddb64ca9e8329", "847449dd0d1bc381861dc3f1520e2978");
        abcd = function () {
            if (showLoading) {
                $ionicLoading.show({template: '加载中...'});
            }

            var GameScore = Bmob.Object.extend("Game");
            var query = new Bmob.Query(GameScore);
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
            abcd();
        }

        $scope.more = true;
        $scope.results = [];
        var skip = 0;

        $scope.loadGithubCommits = function () {
            console.log('loadmore========>>>');
            showLoading = false;
            abcd();
        }

        $scope.click = function(id){
            console.log("click:"+id);
            document.getElementById(id).innerHTML='<iframe height=100 width=100 src="http://player.youku.com/embed/XODMxMDA4NjE2" frameborder=0 allowfullscreen></iframe>';
        }
    })

    .controller('FriendsCtrl', function ($scope, Friends) {
        $scope.friends = Friends.all();
    })

    .controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
        $scope.friend = Friends.get($stateParams.friendId);
    })

    .controller('AccountCtrl', function ($rootScope,$scope, $ionicLoading) {
        $scope.addComment = function() {
//            var query2 = new Bmob.Query(Xy_List);
//            query2.first({
//                success: function (result) {
//                    console.log(result);
//
//
//                },
//                error: function(error) {
//                    alert("查询失败: " + error.code + " " + error.message);
//                }
//            });
            // 查询用户
            // 保存用户信息给rootScrop
            var query = new Bmob.Query("_User");
            query.first({
                //查询要保存的用户，这个对象应该要被序列话到本地
                success: function (user) {
                    $rootScope.user = user;
//                    alert();
                    localStorage.setItem( 'data', JSON.stringify(user) );
                    var aa = localStorage.getItem('data');
                    var outP = eval('('+aa+')');
                    console.log(outP);

                    var Xy_List = Bmob.Object.extend("Xy_List");
                    // 插入许愿列表
                    //var aa = Bmob.Query(Xy_List);
                    var ddd = new Xy_List();
                    ddd.set("title","宣言毕业");
                    // Pointer指针
                    ddd.set("userId",user);
                    ddd.save(null,{
                        success:function(ddd){
                            var relation = ddd.relation("commentId");
                            // 添加评论
                            var Comment = Bmob.Object.extend("Comment");
                            var comment = new Comment();
                            comment.set("content","祝贺你毕业了");
                            comment.save(null,{
                                success:function(comment){
//                            alert("插入成功");
                                    relation.add(comment);
                                    ddd.save();
                                    alert("留言保存成功");
                                },
                                error:function(ddd, error){
                                    alert("留言保存失败"+error);
                                }
                            });
//                    var relation = ddd.relation("commentId");
//                    relation.add(ddd);
//                    res.save();
//                                alert("success");
                        },
                        error:function(ddd, error){
                            alert("许愿保存失败:"+error.message);
                        }
                    });

                },
                error: function(error) {
                    alert("查询失败: " + error.code + " " + error.message);
                }
            });





//            aa.find({
//                success: function (results) {
//                    relation.add(results[0]);
//                    res.save();
//                },
//                error: function(error) {
//                    alert("查询失败: " + error.code + " " + error.message);
//                }
//            });


//            var relation = res.relation("commentId");
//            relation.query().find({
//                success:function(list){
////                                alert(list[0]);
//
//                }
//            });
//
//            var Comment = Bmob.Object.extend("Comment");
//            var ddd = new Comment();
//            ddd.set("content","didi");
//            ddd.save(null,{
//                success:function(ddd){
//                    alert("插入成功");
//                    relation.add(ddd);
//                    res.save();
////                                alert("success");
//                },
//                error:function(ddd, error){
//
//                }
//            });
//
//            //js 线程等待，查找一下是否有回调的函数
////                        setTimeout(function(){
////
////
////                        },100);
//
//            var query2 = new Bmob.Query(Comment);
//            query2.first({
//                success: function (result) {
//
//
//
//                },
//                error: function(error) {
//                    alert("查询失败: " + error.code + " " + error.message);
//                }
//            });
        }

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
//            var Comment = Bmob.Object.extend("Comment");
//
//            var aa = Bmob.Query(XyList);
//            aa.find({
//                success: function (results) {
//                    relation.add(results[0]);
//                    res.save();
//                },
//                error: function(error) {
//                    alert("查询失败: " + error.code + " " + error.message);
//                }
//            });


//                                comment.set("content","TEST");
////                                comment.save();
//                                relation.add(comment);
//                                res.save();

//            alert(XyList.test2().test1());




            var query = new Bmob.Query(XyList);
            query.limit(5);
            query.skip(skip);

            query.descending("updatedAt");


            // 查询所有数据
            query.find({
                success: function (results) {
                    if (results.length > 0) {
                        var res = results[0];


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
//            document.getElementById(id).innerHTML='<iframe height=100 width=100 src="http://player.youku.com/embed/XODMxMDA4NjE2" frameborder=0 allowfullscreen></iframe>';
        }

    });
