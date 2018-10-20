//���������, ���� �� �������� � local storage.
//���� ���� - ����������� �������� ������� arr, ���� ��� - ������� �����.
if ((localStorage.getItem('task') !== null)) {
    var arrList = JSON.parse(localStorage.getItem('task'));
}
else {
    var arrList = [];
}
if (arrList[0] === undefined) {
    var arrActual = [];
}
else {
    var arrActual = arrList[0];
}
console.log(arrActual);
console.log(arrList);
//��������� ������� �� local storage  
function localDrow() {
    if (localStorage.getItem('task') !== null) {
        var localValue = JSON.parse(localStorage.getItem('task')); //���������� �����������
        for (let i = 0, len = localValue[0].length; i < len; i++) {
            taskDrow(localValue[0][i]);
        }
    }
}
localDrow();
//������������ �������
$('.main__navigation').on('click', function () {
    $('.main__navigation').removeClass('main__navigation-active');
    $(this).addClass('main__navigation-active');
    $('.main__table').removeClass('curent-table');
    $('.main__table').eq($(this).index()).addClass('curent-table');
});
$('.main__table').eq(0).addClass('curent-table');
$('.main__navigation').eq(0).addClass('main__navigation-active');
//��������� ����
$('.add-task').on('click', function () {
    $('.modal').css('display', 'block');
    $('.modal__window-textarea').val('');
    $('.modal__window-input').val('');
});
$('.modal__window-exit').on('click', function () {
    $('.modal').css('display', 'none');
});


function timeRemain(){
    var dateTime = new Date($('.modal__window-date').val()).getTime();
    var date = dateTime - new Date();
    return date;
}
//���������� �������
$('.modal__window-submit').on('click', function () {
   
    if (timeRemain() > 0) {
        var date = timeRemain() / 3600000;
        var taskProperty = {
            name: $('.modal__window-input').val(),
            description: $('.modal__window-textarea').val(),
            curentDate: new Date(),
            compliteDate: Math.ceil(date)
        };
        arrActual.push(taskProperty);
        arrList[0] = arrActual;
        localStorage.setItem('task', JSON.stringify(arrList));
        taskDrow(taskProperty);
    }
    else
        alert('invalid Date');

});
//������� ���������
function taskDrow(taskProperty) {
    $('.main__table-actual').append('<div class="main__table-obj">' +
        '<div class="main__table-task">' + taskProperty.name + '</div >' +
        '<div class="main__table-task">' + taskProperty.curentDate + '</div>' +
        '<div class="main__table-task">' + taskProperty.compliteDate +' Hours' + '</div>' +
        '<div class="buttons__wrapper"><div class="complite-button task__button">Complete</div>' +
        '<div class="edit-button task__button">Edit</div>' +
        '<div class="delete-button task__button" data-delete="delete">Delete</div></div>' +
        '</div > ');
    $('.modal').css('display', 'none');
}
//�������� �������
$('.main__table-actual').on('click', function (e) {
    if (e.target.hasAttribute('data-delete', 'delete')) {
        var indexOfDelete = $('.main__table-obj').index($(e.target).closest('.main__table-obj'));
        $('.delete__window').css({
            'top': e.pageY - 50,
            'left': e.pageX + 50,
            'display': 'block'
        });
        $('.delete__window').attr('index', indexOfDelete);
         
    }
});
$('.delete__window-button-no').on('click', function () {
    $('.delete__window').css({
        'display': 'none'
    });
});
//�������� �� �������
$('.delete__window-button-yes').on('click', function () {
    var indexOfDelete = $('.delete__window').attr('index');   
    var taskList = JSON.parse(localStorage.getItem('task'));
    taskList[0].splice(indexOfDelete, 1);

    localStorage.setItem('task', JSON.stringify(taskList));
    $('div').remove('.main__table-obj');
    localDrow();
    $('.delete__window').css({
        'display': 'none'
    });
});
