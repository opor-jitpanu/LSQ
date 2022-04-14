/** Index page renderer.
*/
define(["../helper/pagination",
  "../helper/segment-viewer",
  "../helper/util"],
  function(Pagination, Viewer, util) {







    function render(data, params) {




      start();
      var url1 = [];
      var url2 = [];

      var obj1 = {};



      function start() {

        var m = new Map()

        var dict = {};

        list_image = JSON.parse(sessionStorage.getItem("list_image"));

        if (list_image.length == 1) {
          window.location.href = "../admin.html";
        }

        console.log(list_image);

        for (var i = 1; i < list_image.length; i++) {

          dict["key"+i] = list_image[i];
          
          

          if (i == list_image.length-1) {
            // console.log(dict);
            getURL1(dict);
          }
          

        }
      }


      function getURL1(dict) {

        list_image = JSON.parse(sessionStorage.getItem("list_image"));
        var storageRef = firebase.storage().ref("images/");
        var count = 0;
        for (let [key, value] of Object.entries(dict)) {
          console.log(key,value);
          storageRef.child(value+".jpg").getDownloadURL().then(function(url) {


            dict[key+'image'] = url;
            count += 1;


            if (count == list_image.length-1) {
              // console.log(dict);
              getURL2(dict);

            }

          }).catch(function(error) {
            console.log("Error: " + error);
          });
        }




      }


      function getURL2(dict) {






        list_image = JSON.parse(sessionStorage.getItem("list_image"));

        
        var count = 0;


        for (let [key, value] of Object.entries(dict)) {
          // console.log(key,value);

          var storageRef2 = firebase.storage().ref("annotation/"+value);
          // console.log(value+"_"+list_image[0]+".png");
          storageRef2.child(value+"_"+list_image[0]+".png").getDownloadURL().then(function(url3) {


            // console.log(url3);
            dict[key+'anno'] = url3;
            count += 1;

            // console.log(dict);
            if (count == list_image.length-1) {
              // console.log(dict);
              runSystem(dict);

            }

            

          }).catch(function(error) {
            // console.log("Error: " + error);
          });
        }











        
        

      }


      function runSystem(dict) {

        console.log(dict);

        list_image = JSON.parse(sessionStorage.getItem("list_image"));

        for (var i = 1; i < list_image.length; i++) {

          console.log(dict["key"+i+"image"]);




          var viewer = new Viewer(dict["key"+i+"image"], dict["key"+i+"anno"], {
            width: (params.width || 240),
            height: (params.height || 320),
            colormap: data.colormap
          }),
          anchor = document.createElement("a");
          anchor.appendChild(viewer.container);
          anchor.href = '#';
          
          document.getElementById('lc').appendChild(anchor);
          
          var myDiv = document.getElementById("lc");  


          // var createB = document.createElement('a');
          // var createAText = document.createTextNode("Approve");
          // createB.classList.add("btn");
          // createB.classList.add("btn-success");
          // createB.setAttribute('href', "reload.html?image="+dict["key"+i]+"&check=approve&user="+list_image[0]);
          // createB.appendChild(createAText);
          // myDiv.appendChild(createB);



          // var createA = document.createElement('a');
          // var createAText = document.createTextNode("Reject");
          // createA.classList.add("btn");
          // createA.classList.add("btn-danger");
          // createA.setAttribute('href', "reload.html?image="+dict["key"+i]+"&check=reject&user="+list_image[0]);
          // createA.appendChild(createAText);
          // myDiv.appendChild(createA);

          var checkbox = document.createElement('input'); 
          checkbox.type = "checkbox"; 
          checkbox.name = "name"; 
          checkbox.value = "approve"; 
          checkbox.id = list_image[i]+"cba";

          var label = document.createElement('label'); 
          label.htmlFor = "id"; 

          label.appendChild(document.createTextNode('Approve')); 

          myDiv.appendChild(checkbox); 
          myDiv.appendChild(label); 




          var checkbox2 = document.createElement('input'); 
          checkbox2.type = "checkbox"; 
          checkbox2.name = "name"; 
          checkbox2.value = "reject"; 
          checkbox2.id = list_image[i]+"cbr";

          var label2 = document.createElement('label'); 
          label2.htmlFor = "id"; 

          label2.appendChild(document.createTextNode('Reject')); 

          myDiv.appendChild(checkbox2); 
          myDiv.appendChild(label2);

          






        }




      }







    }

    return render;

  });






