/** Index page renderer.
*/
define(["../helper/pagination",
  "../helper/segment-viewer",
  "../helper/util"],
  function(Pagination, Viewer, util) {


    function render(data, params) {


      var username = sessionStorage.getItem("username");
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const img_name = urlParams.get('image')

      console.log(img_name);
      console.log(username);

      var i;

      var storageRef2 = firebase.storage().ref("images/");

      storageRef2.child(img_name+".jpg").getDownloadURL().then(function(url2) {

        var storageRef = firebase.storage().ref("annotation/"+img_name);
        console.log(url2);

        storageRef.child(img_name+'_'+username+".png").getDownloadURL().then(function(url) {



         data.imageURLs[0] = url2;
         data.annotationURLs[0] = url;

         var viewer = new Viewer(url2, url, {
          width: (params.width || 240),
          height: (params.height || 320),
          colormap: data.colormap
        }),
         anchor = document.createElement("a");
         anchor.appendChild(viewer.container);
         anchor.href = '../segment/index.html?view=edit&id=0&image='+img_name;

             // var text = document.createTextNode(img_name+'_'+user+".png");
             // anchor.appendChild(text);

             document.body.appendChild(anchor);

           }).catch(function(error) {
            console.log("Error: " + error);
            alert("คุณยังไม่ได้เพิ่ม Annotation กรุณา upload blank.png");
          });


         }).catch(function(error) {
          console.log("Error: " + error);
        });


  }

  return render;

});






