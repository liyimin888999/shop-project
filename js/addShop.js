class AddShop {
  constructor () {
    this.inputName = document.querySelector("#inputName");
    this.inputPrice = document.querySelector("#inputPrice");
    this.inputNum = document.querySelector("#inputNum");
    this.addBtn = document.querySelector("#btn-shop-add");
    this.init();
  }
  init () {
    this.addBtn.onclick = () => {
      let name = this.inputName.value,
          price = this.inputPrice.value,
          num = this.inputNum.value;
      console.log(name);
      // 表单验证是否为空
      if(name === "" || price === "" || num === "") {
        console.log(111);
        alert("输入不能为空");
        return;
      }     
      tools.ajaxGetPromise("api/v1/add.php", {name, price, num}).then(data => {
        if(data.res_code === 1){
          alert(data.res_message);
          // 吧input的value清空
          this.inputName.value = this.inputPrice.value = this.inputNum.value = "";

          // 让模态框隐藏
          $('#addModal').modal('hide');
           // 渲染页面
           getShop.init();
        }
      }) 
    }
  }
}
new AddShop();