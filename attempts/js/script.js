//Проверяем, есть ли значения в local storage.
//если есть - присваиваем значение массиву arr, если нет - создаем новый.
if (localStorage.getItem('task') !== null) {
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
if (arrList[1] === undefined) {
    var arrDeleted = [];
}
else {
    var arrDeleted = arrList[1];
}
if (arrList[2] === undefined) {
    var arrCompleted = [];
}
else {
    var arrCompleted = arrList[2];
}
//отрисовка заданий из local storage  
function localDrow(j) {
    $('div').remove('.main__table-obj');
    if (localStorage.getItem('task') !== null) {
        var localValue = JSON.parse(localStorage.getItem('task'));
        for (let i = 0, len = localValue[j].length; i < len; i++) {
            taskDrow(localValue[j][i], i);
        }
    }
}
var keyOfEdit = {};

//переключение вкладок
$('.main__navigation').on('click', function () {
    $('.main__navigation').removeClass('main__navigation-active');
    $(this).addClass('main__navigation-active');
    $('.main__table').removeClass('curent-table');
    $('.main__table').eq($(this).index()).addClass('curent-table');
    
    if ($('.curent-table').hasClass('main__table-delete')) {
        if (localStorage.getItem('task') !== null) {
            var localValue = JSON.parse(localStorage.getItem('task'));
            if (localValue[1] !== undefined && localValue[1] !== null) {
                localDrow(1);
            }
        }
    }

    if ($('.curent-table').hasClass('main__table-actual')) {
        if (localStorage.getItem('task') !== null) {
            localValue = JSON.parse(localStorage.getItem('task'));
            if (localValue[0] !== undefined && localValue[0] !== null){
                localDrow(0);
            }
        }
    }
    if ($('.curent-table').hasClass('main__table-done')) {
        if (localStorage.getItem('task') !== null) {
            localValue = JSON.parse(localStorage.getItem('task'));
            if (localValue[2] !== undefined && localValue[2] !== null) {
                localDrow(2);
            }
        }
    }

});
$('.main__table').eq(0).addClass('curent-table');
$('.main__navigation').eq(0).addClass('main__navigation-active');
localDrow(0);
//модальное окно
$('.add-task').on('click', function () {
    $('.modal').css('display', 'block');
    $('.modal__window-textarea').val('');
    $('.modal__window-input').val('');
});
$('.modal__window-exit').on('click', function () {
    $('.modal').css('display', 'none');
});
$('.edit__window-exit').on('click', function () {
    $('.edit__window').css('display', 'none');
});

function timeRemain(){
    var dateTime = new Date($('.modal__window-date').val()).getTime();
    var date = dateTime - new Date();
    return date;
}
//Добавление задания
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
        localDrow(0);
    }
    else
        alert('invalid Date');
});
$('.modal__window-edit').on('click', function () {
    var taskList = JSON.parse(localStorage.getItem('task'));
    var dateTime = new Date($('.edit__window-date').val()).getTime();
    var date = dateTime - new Date();
    if (date > 0) {
        date = date / 3600000;
        var taskProperty = {
            name: $('.edit__window-input').val(),
            description: $('.edit__window-textarea').val(),
            curentDate: new Date(),
            compliteDate: Math.ceil(date)
        };
        taskList[keyOfEdit.j][keyOfEdit.i] = taskProperty;

        localStorage.setItem('task', JSON.stringify(taskList));
        localDrow(keyOfEdit.j);
        $('.edit__window').css('display', 'none');

    }
    else
        alert('invalid Date');
});
//функция отрисовки
function taskDrow(taskProperty, i) {
    
    $('.curent-table').append('<div class="main__table-obj">' +
        '<div class="main__table-task">' + taskProperty.name + '</div >' +
        '<div class="main__table-task">' + taskProperty.curentDate + '</div>' +
        '<div class="main__table-task">' + taskProperty.compliteDate +' Hours' + '</div>' +
        '</div > ');
    if ($('.curent-table').hasClass('main__table-actual')) {
        $('.main__table-obj').eq(i).append('<div class="buttons__wrapper">' +
            '<div class="complite-button task__button" data-complete="complete">Complete</div>' +
            '<div class="edit-button task__button" data-edit="edit">Edit</div>' +
            '<div class="delete-button task__button" data-delete="delete">Delete</div></div>');
    }
    if ($('.curent-table').hasClass('main__table-delete')) {
        $('.main__table-obj').eq(i).append('<div class="buttons__wrapper">' +
            '<div class="complite-button task__button" data-complete="complete">Complete</div>' +
            '<div class="edit-button task__button" data-edit="edit">Edit</div></div>' +
            '<div class="recover-button task__button" data-recover="recover">Recover</div></div>');
    }
    if ($('.curent-table').hasClass('main__table-done')) {
        $('.main__table-obj').eq(i).append('<div class="buttons__wrapper">' +
            '<div class="edit-button task__button" data-edit="edit">Edit</div></div>' +
            '<div class="delete-button task__button" data-delete="delete">Delete</div>' +
            '<div class="recover-button task__button" data-recover="recover">Recover</div></div >');
    }
    $('.modal').css('display', 'none');
}
//функция завершения
function completeButton(elem, indexOfDelete) {
    var taskList = JSON.parse(localStorage.getItem('task'));
    if ($(elem).hasClass('main__table-delete')) {
        var deletedTask = taskList[1].splice(indexOfDelete, 1);
        arrDeleted = taskList[1];
        var j = 1;
    }
    if ($(elem).hasClass('main__table-actual')) {
        deletedTask = taskList[0].splice(indexOfDelete, 1);
        arrActual = taskList[0];
        j = 0;
    }
    arrCompleted.push(deletedTask[0]);
    taskList[2] = arrCompleted;
    localStorage.setItem('task', JSON.stringify(taskList));
    localDrow(j);
    
}
//функция кнопки удаления
function deleteButton(indexOfDelete, taskList) {
    if (arrDeleted === null) {
        arrDeleted = [];
    }
    if ($('.curent-table').hasClass('main__table-actual')) {
        var deletedTask = taskList[0].splice(indexOfDelete, 1);
        arrActual = taskList[0];
        arrDeleted.push(deletedTask[0]);

        taskList[1] = arrDeleted;

        localStorage.setItem('task', JSON.stringify(taskList));
        localDrow(0);
    }
    if ($('.curent-table').hasClass('main__table-done')) {
        deletedTask = taskList[2].splice(indexOfDelete, 1);
        arrCompleted = taskList[2];

        arrDeleted.push(deletedTask[0]);

        taskList[1] = arrDeleted;
        localStorage.setItem('task', JSON.stringify(taskList));
        localDrow(2);
    }
}
//функция кнопки восстановления
function recoverButton(elem, indexOfDelete) {
    var taskList = JSON.parse(localStorage.getItem('task'));
    if ($(elem).hasClass('main__table-done')) {
        var recoverTask = taskList[2].splice(indexOfDelete, 1);
        arrCompleted = taskList[2];
        var j = 2;
    }
    if ($(elem).hasClass('main__table-delete')) {
        recoverTask = taskList[1].splice(indexOfDelete, 1);
        arrDeleted = taskList[1];
        j = 1;
    }
    arrActual.push(recoverTask[0]);
    taskList[0] = arrActual;
    localStorage.setItem('task', JSON.stringify(taskList));
    localDrow(j);
}
//функция редактирования
function editButton(elem, indexOfDelete) {
    var taskList = JSON.parse(localStorage.getItem('task'));
    if ($(elem).hasClass('main__table-delete')) {
        var editeTask = taskList[1][indexOfDelete];
        var j = 1;
    }
    if ($(elem).hasClass('main__table-actual')) {
        editeTask = taskList[0][indexOfDelete];
        j = 0;
    }
    if ($(elem).hasClass('main__table-done')) {
        editeTask = taskList[2][indexOfDelete];
        j = 2;
    }
    $('input[type="text"]').val(editeTask.name);
    $('textarea').val(editeTask.description);
    return j;
}
//обработчик кнопочек
$('.main__table').on('click', function (e) {
    var indexOfDelete = $('.main__table-obj').index($(e.target).closest('.main__table-obj'));
    //удаление
    if (e.target.hasAttribute('data-delete', 'delete')) {
        $('.delete__window').css({
            'top': e.pageY - 50,
            'left': e.pageX + 50,
            'display': 'block'
        });
        $('.delete__window').attr('index', indexOfDelete);
    }
    //редактирование
    if (e.target.hasAttribute('data-edit', 'edit')) {
        $('.edit__window').css('display', 'block');
        var j = editButton(this, indexOfDelete);
        keyOfEdit = {
            i: indexOfDelete,
            j: j
        };
        
    }
    //восстановление
    if (e.target.hasAttribute('data-recover', 'recover')) {
        recoverButton(this, indexOfDelete);
    }
    //выполнено
    if (e.target.hasAttribute('data-complete', 'complete')) {
        completeButton(this, indexOfDelete);
    }
});


$('.delete__window-button-no').on('click', function () {
    $('.delete__window').css({
        'display': 'none'
    });
});

//удаление из модалки
$('.delete__window-button-yes').on('click', function () {
    var indexOfDelete = $('.delete__window').attr('index');   
    var taskList = JSON.parse(localStorage.getItem('task'));
    deleteButton(indexOfDelete, taskList);
    $('.delete__window').css({
        'display': 'none'
    });
});

