

var $j = jQuery.noConflict();
function deleteForm () {
    $j.ajax({
        url: '/manageFile',
        type: 'DELETE',
    })
    .then(data =>{
        alert('Thanh cong')
        window.location.href = "/home"        
    })
    .catch(error =>{
        console.log(error);
    })
}