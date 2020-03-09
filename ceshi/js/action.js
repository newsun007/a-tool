$(function(){


    var year 
    var month
    var days 


    //生成图片
    var sum=[]
    $('#btn').on('click',function(){

      //获取日期
      var data=$('#name').val();
      var alltime=[];
      var mydata=$('#time').val();
      alltime=mydata.split('-')
       year  =alltime[0];
       month =alltime[1];
       days  =alltime[2];
      sum=data.trim().split(/\s+/);
      //循环生成canvas图片
      for(var i=0;i<sum.length;i++){
         $("#box").append( $(`<canvas id="mycanvas${i}" class="getcanvas" width="800" height="565"></canvas>`));
             var cv = document.getElementById('mycanvas'+i);
             var ctx = cv.getContext('2d');
             var zi = sum[i];    
             img = new Image();
             img.setAttribute("crossOrigin",'Anonymous');
             img.src = './images/8888888.jpg';
             ctx.drawImage(img, 0, 0);
             ctx.font = 'bold 20px Arial';
             ctx.fillStyle = 'black';   


//测试
            var textWidth = ctx.measureText(zi).width;
                  
             ctx.fillText(zi, 202-textWidth, 259);
            //获取文本宽度
                  
            //绘制直线
            ctx.strokeStyle="#000000";
            ctx.lineWidth = 2;
            ctx.moveTo(202-textWidth,263);
            ctx.lineTo(202,263);
            ctx.stroke();


        
          //绘制日期  年份
           ctx.fillStyle = 'black';//442
           ctx.font = 'italic 26px Arial';
           ctx.fillText(year, 500, 445);
          //绘制日期  年字
           ctx.fillStyle = 'black';
           ctx.font = 'normal 20px Arial';
           ctx.fillText('年', 563, 442);

            if(month.length==2){
               //绘制日期  月份
                ctx.fillStyle = 'black';
                ctx.font = 'italic 26px Arial';
                ctx.fillText(month, 585, 445);
                 //绘制日期  月字
                 ctx.fillStyle = 'black';
                 ctx.font = 'normal 20px Arial';
                 ctx.fillText('月', 615, 442);


                if(days.length==2){
                    //绘制日期  日份
                     ctx.fillStyle = 'black';
                     ctx.font = 'italic 26px Arial';
                     ctx.fillText(days, 635, 445);
                    //绘制日期  日字
                     ctx.fillStyle = 'black';
                     ctx.font = 'normal 20px Arial';
                     ctx.fillText('日', 668, 442);
                }else{
                       //绘制日期  日份
                       ctx.fillStyle = 'black';
                       ctx.font = 'italic 26px Arial';
                       ctx.fillText(days, 635, 445);
                      //绘制日期  日字
                       ctx.fillStyle = 'black';
                       ctx.font = 'normal 20px Arial';
                       ctx.fillText('日', 655, 442);
                }


                 


            }else if(month.length==1){
                 //绘制日期  月份
                 ctx.fillStyle = 'black';
                 ctx.font = 'italic 26px Arial';
                 ctx.fillText(month, 585, 445);
                 
                //绘制日期  月字
                ctx.fillStyle = 'black';
                ctx.font = 'normal 20px Arial';
                ctx.fillText('月', 608, 442);

                if(days.length==2){
                  //绘制日期  日份
                   ctx.fillStyle = 'black';
                   ctx.font = 'italic 26px Arial';
                   ctx.fillText(days, 635, 445);
                  //绘制日期  日字
                   ctx.fillStyle = 'black';
                   ctx.font = 'normal 20px Arial';
                   ctx.fillText('日', 668, 442);
              }else{
                     //绘制日期  日份
                     ctx.fillStyle = 'black';
                     ctx.font = 'italic 26px Arial';
                     ctx.fillText(days, 635, 445);
                    //绘制日期  日字
                     ctx.fillStyle = 'black';
                     ctx.font = 'normal 20px Arial';
                     ctx.fillText('日', 655, 442);
              }

              


            }


    }
     
    });

     //一键下载图片
     $('#download').on('click',function(){

      for(var i=0;i<$('.getcanvas').length;i++){
          var canvas = document.getElementById('mycanvas'+i);
           var myurl=canvas.toDataURL("image/png")
           var alink = document.createElement("a");
           alink.href = myurl;
           alink.download = sum[i]+".png";
           alink.click();
      }

     
});

  

    //读取excel表格数据生成图片===================

    // 读取本地excel文件
	function readWorkbookFromLocalFile(file, callback) {
		var reader = new FileReader();
		reader.onload = function(e) {
			var data = e.target.result;
			var workbook = XLSX.read(data, {type: 'binary'});
			if(callback) callback(workbook);
		};
		reader.readAsBinaryString(file);
  };
  


  function readWorkbook(workbook) {
		var sheetNames = workbook.SheetNames; // 工作表名称集合
		var worksheet = workbook.Sheets[sheetNames[0]]; // 这里我们只读取第一张sheet
		var csv = XLSX.utils.sheet_to_csv(worksheet);
    //document.getElementById('antherbox').innerHTML = csv2table(csv);
    //csv2table(csv);
    var rows = csv.split('\n');
    rows.pop(); // 最后一行没用的
    rows.shift();
    
   // console.log(rows)
    return rows
	}
	// 将csv转换成表格
	function csv2table(csv)
	{
		 var rows = csv.split('\n');
     rows.pop(); // 最后一行没用的
     console.log(rows)
    

	}

var getdata;
  $("#getfile").on('change',function(e){
       var files = e.target.files;
       if(files.length == 0) return;
       var f = files[0];
       if(!/\.xlsx$/g.test(f.name)) {
         alert('仅支持读取xlsx格式！');
         return;
       }
       readWorkbookFromLocalFile(f, function(workbook) {
        // console.log(workbook)
        getdata= readWorkbook(workbook);
       });
    
  });
    
     
  var sum_new=[];
  var kai=true;
  //点击生成图片并下载图片
  $("#success").on('click',function(e){
    //console.log(getdata);
    if(kai){
      getdata.forEach(function(getdata, index) {
        var columns = getdata.split(',');
        sum_new.push(columns)
       
      });
      kai=false;
    };
   // console.log(sum_new)
    for(var idx=0;idx<sum_new.length;idx++){
          
        $("#antherbox").append( $(`<canvas id="newcanvas${idx}" class="getcanvas_new" width="862" height="485"></canvas>`));
        var cv = document.getElementById('newcanvas'+idx);
        var ctx = cv.getContext('2d');
        var zi = sum_new[idx][0]+"同学：";//姓名   
        var chuqing = sum_new[idx][1]+"%";//出勤
        var fenshu = "老师打分："+sum_new[idx][2]+"分";//分数
        var pingji = sum_new[idx][3];//评级
        var img = new Image();
        img.setAttribute("crossOrigin",'Anonymous');
        img.src = './images/1.jpg';
        ctx.drawImage(img, 0, 0);
       

       //绘制姓名
           ctx.font = 'bold 28px SimSun';
           ctx.fillStyle = 'black';   
           var textWidth = ctx.measureText(zi).width;
           ctx.fillText(zi, 120, 80);
       //绘制出勤
        //if(chuqing.length>=4){
            
          ctx.fillStyle = '#0070c0';//442
          ctx.font = 'bold 18px SimSun';
          ctx.fillText(chuqing, 86, 142);
       

        //绘制分数
         ctx.fillStyle = '#0070c0';
         ctx.font = 'bold 17px SimSun';
         ctx.fillText(fenshu, 135, 142);
          
          //绘制评级
          ctx.fillStyle = '#92d050';
          ctx.font = 'bold 18px SimSun';
          ctx.fillText(pingji, 160, 166);

          
    };
  
});


     //一键下载图片
     $('#download_new').on('click',function(){
     
 
      for(var i=0;i<sum_new.length;i++){
       
          var canvas = document.getElementById('newcanvas'+i);
           var myurl=canvas.toDataURL("image/png")
           var alink = document.createElement("a");
           alink.href = myurl;
           alink.download = sum_new[i][0]+".png";
           alink.click();
      };

     
});

 


              
});//尾部