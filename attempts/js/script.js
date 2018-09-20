$('.main__navigation').on('click',function(){
    $('.main__table').removeClass('curent-table');
    $('.main__table').eq($(this).index()).addClass('curent-table');
})
$('.main__table').eq(0).addClass('curent-table');
$('.add-task').on('click',function(){
    $('.modal').css('display','block');
    $('.modal__window-textarea').val('');
    $('.modal__window-input').val('');
})
$('.modal__window-exit').on('click',function(){
    $('.modal').css('display','none');
})
var arr =[];
$('.modal__window-submit').on('click',function(){
    var taskProperty = {name:$('.modal__window-input').val(),
                        description:$('.modal__window-textarea').val()};
    arr.push(taskProperty);
    localStorage.setItem('task',JSON.stringify(arr));
    $('.main__table-actual').append('<table  width="80%" cellpadding="10px"><tr><td>'+taskProperty.name+
                                  '</td><td>'+taskProperty.description+'</td></tr></table>')
    $('.modal').css('display','none');
})