商品管理系统

### 系统功能

* 登录
* 注册
* 商品展示
* 商品修改
* 商品删除
* 商品录入

### 使用的技术

* HTML5
* CSS3
* javascript
* ajax
* bootstrap
* php
* mysql


### 接口文档

##### 查询当前页数据

- url ：api/v1/select.php

- method： get

- query : {pageIndex, count}

- data : {

  ​	res_code: 1, // 1代表成功， 0代表失败

  ​	res_message: "网络错误，查询失败"

  ​	res_body: {

  ​		data: [

  ​			{id, name, price, num},

  ​			{id, name, price, num}

  ​		]

  ​	}

  }



##### 添加商品接口

- url : api/v1/add.php

- method : get

- query : {name, price, num}

- data : {

  ​	res_code : 1, // 1代表添加成功，0代表失败

  ​	res_message:   "添加成功"  ||  "网络错误，添加失败，请重试",

  ​	res_body : {id, name, price, num}

  }




##### 删除商品接口

- url ：api/v1/delete.php

- method : get

- query : {id}

- data: {

  res_code : 1, // 1代表添加成功，0代表失败

  res_message:   "删除成功"  ||  "网络错误，删除失败，请重试",

  }



##### 编辑商品确定接口

- url :api/v1/ok.php

- method : get

- query ： {id, price, num}

- data : {

  res_code : 1, // 1代表添加成功，0代表失败

  res_message:   "更新成功"  ||  "网络错误，更新失败，请重试"

  }

  ​


#####注册

- url: api/v1/register.php

- method : post

- query : {username, password}

- data : {

  res_code : 1, // 1代表添加成功，0代表失败

  res_message:   "注册成功"  ||  "网络错误，注册失败，请重试"

  }

##### 登录

- url: api/v1/login.php

- method : post

- query : {username, password}

- data : {

  res_code : 1, // 1代表添加成功，0代表失败

  res_message:   "登录成功"  ||  "用户名或密码错误"

  }




