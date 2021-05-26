
// var currentPage = 1
// var $j = jQuery.noConflict();
// function pageee (page) {
//     currentPage = page
//     $j.ajax({
//         url: '/manh/pagination?page=' + page,
//         type: 'GET'
//     })
//     .then(data =>{
//          $('#content').html('')
//     for (let i = 0; i < data.length; i++) {
//         const element = data[i];
//         var item = $(`
//                 <h5>${element.username} : ${element.password}</h5>
//         `)
//         $('#content').append(item)
//     }
//     })
//     .catch(error =>{
//         console.log('Bye Server');
//     })
// }




// function nextPage () {
//     currentPage++
//     $j.ajax({
//         url: '/manh/pagination?page=' + currentPage,
//         type: 'GET'
//     })
//     .then(data =>{
//          $('#content').html('')
//     for (let i = 0; i < data.length; i++) {
//         const element = data[i];
//         var item = $(`
//                 <h5>${element.username} : ${element.password}</h5>
//         `)
//         $('#content').append(item)
//     }
//     })
//     .catch(error =>{
//         console.log('Bye Server');
//     })
// }

// function prePage () {
//     currentPage--
//     $j.ajax({
//         url: '/manh/pagination?page=' + currentPage,
//         type: 'GET'
//     })
//     .then(data =>{
//          $('#content').html('')
//     for (let i = 0; i < data.length; i++) {
//         const element = data[i];
//         var item = $(`
//                 <h5>${element.username} : ${element.password}</h5>
//         `)
//         $('#content').append(item)
//     }
//     })
//     .catch(error =>{
//         console.log('Bye Server');
//     })
// }


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


var $j = jQuery.noConflict();
$j('#paging').pagination({
    dataSource: '/manh/pagination?page=1',
    locator: 'data',
    totalNumberLocator: function(response) {
      
        // you can return totalNumber by analyzing response content
        return response.load
    },
    pageSize: 1, 
    afterPageOnClick: function(event, pageNumber) {
            pageee(pageNumber)
    },
    afterNextOnClick: function(event, pageNumber){
            pageee(pageNumber)
    },
    afterPreviousOnClick: function(event, pageNumber){
            pageee(pageNumber)
    }
})

function pageee (page) {
    $('#content').html('')
        $j.ajax({
            url: '/manh/pagination?page=' + page,
            type: 'GET'
        })
        .then(result =>{
        for (let i = 0; i < result.data.length; i++) {
            const element = result.data[i];
            var item = $(`
                    <h5 style="font-size: 20px">Username :${element.username} <br>
                        Password : ${element.password}</h5> <button onclick="del()">Xoá nè</button>
            `)
            $('#content').append(item)
        }
        })
        .catch(error =>{
            console.log('Bye Server');
        })
    }

    function del () {
        $j.ajax({
          url: '/manh/delete',
          type: 'DELETE'
        })
        .then(data =>{
          res.json(data)
        })
        .catch(err => {
          res.json(err)
        })
    }

    // function next () {
    //     $j.ajax({
    //         url: '/test',
    //         type: 'GET'
    //     })
    //     .then(data =>{
    //         setCookie('token', data.token, 1)
    //         window.location.href = "/test"
    //     })
    //     .catch(error => {
    //         res.json(error)
    //     })
    // }

  
